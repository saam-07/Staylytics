import { useEffect, useMemo, useState, useCallback } from "react";
import { Search, Download } from "lucide-react";
import {reviewsApi} from "../services/reviewsApi";

const ReviewArchive = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [themeFilter, setThemeFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");

  // Modal States
  const [selectedReview, setSelectedReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  // 1. Stable Fetching Function
  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await reviewsApi.getAll();
      setReviews(data || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadReviews = async () => {
        await fetchReviews();
    };

    loadReviews();
}, [fetchReviews]);

  // 2. Computed Filtered & Sorted Reviews (Derive state using useMemo)
  const filteredReviews = useMemo(() => {
    let data = [...reviews];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (r) =>
          (r.guestName || "").toLowerCase().includes(term) ||
          (r.review || "").toLowerCase().includes(term)
      );
    }

    if (sentimentFilter !== "All") {
      data = data.filter((r) => r.sentiment === sentimentFilter);
    }

    if (themeFilter !== "All") {
      data = data.filter((r) => (r.themes || []).includes(themeFilter));
    }

    data.sort((a, b) => {
      const d1 = new Date(a.createdAt);
      const d2 = new Date(b.createdAt);
      return sortOption === "Newest" ? d2 - d1 : d1 - d2;
    });

    return data;
  }, [reviews, searchTerm, sentimentFilter, themeFilter, sortOption]);

  // 3. Computed Unique Themes
  const availableThemes = useMemo(() => {
    const s = new Set();
    reviews.forEach((r) => (r.themes || []).forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [reviews]);

  // Handler: Delete Review
  const handleDelete = async () => {
    if (!deleteReviewId) return;
    try {
      await reviewsApi.delete(deleteReviewId);
      setReviews((prev) => prev.filter((r) => r.id !== deleteReviewId));
      setDeleteReviewId(null);
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  // Handler: Save Edited Review
  const handleSaveEdit = async () => {
    if (!editingReview) return;
    try {
      await reviewsApi.update(editingReview.id, editingReview);
      setReviews((prev) =>
        prev.map((r) => (r.id === editingReview.id ? editingReview : r))
      );
      setEditingReview(null);
    } catch (err) {
      console.error("Failed to update review:", err);
    }
  };

  // Handler: CSV Export
  const exportCSV = () => {
    const headers = ["Guest Name", "Review", "Sentiment", "Themes", "AI Response"];
    const rows = filteredReviews.map((r) => [
      r.guestName,
      r.review,
      r.sentiment,
      (r.themes || []).join(", "),
      r.aiResponse,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "review_archive.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
  className="min-h-screen p-8"
  style={{ backgroundColor: "var(--bg-page)" }}
>
      <div className="max-w-7xl mx-auto">
       <h1
  className="text-3xl font-bold"
  style={{ color: "var(--text-primary)" }}
   >Review Archive</h1>
        <p
  className="mt-2"
  style={{ color: "var(--text-muted)" }}
>
          Browse, search and manage previously analyzed guest reviews.
        </p>

        {/* Filter Toolbar */}
        <div
            className="mt-8 rounded-xl shadow p-5 flex flex-wrap gap-4 items-center"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-card)",
            }}
          >
          <div className="relative flex-1 min-w-[260px]">
            <Search
            className="absolute left-3 top-3"
            style={{ color: "var(--text-muted)" }}
            size={18}
            />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg pl-10 py-2 focus:outline-none"
          style={{
          backgroundColor: "var(--bg-page)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-main)"
        }}
            />
          </div>

          <select
  value={sentimentFilter}
  onChange={(e) => setSentimentFilter(e.target.value)}
  className="rounded-lg px-3 py-2"
  style={{
    backgroundColor: "var(--bg-page)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-main)"
  }}
>
          
            <option>All</option>
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
          </select>

          
             <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="rounded-lg px-3 py-2"
            style={{
              backgroundColor: "var(--bg-page)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-main)",
            }}
          >         
            {availableThemes.map((theme) => (
              <option key={theme}>{theme}</option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-lg px-3 py-2"
          style={{
            backgroundColor: "var(--bg-page)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-main)"
          }}
          >
            <option>Newest</option>
            <option>Oldest</option>
          </select>

          <button
            onClick={exportCSV}
            className="text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            style={{
              backgroundColor: "var(--btn-primary)",
            }}
          >
            <Download size={18} /> Download CSV
          </button>
        </div>

        {/* Reviews Grid Section */}
        {loading ? (
          <div className="mt-10 text-center text-gray-500">
            Loading reviews...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="mt-10 bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold text-[#6E3B3B]">
              No Reviews Found
            </h2>
            <p className="text-gray-500 mt-2">
              Guest reviews that have been analyzed will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-card)"
            }}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-lg"
                      style={{ color: "var(--text-primary)" }}>
                        {review.guestName}
                      </h3>
                      <p className="text-sm"
                      style={{ color: "var(--text-muted)" }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                        review.sentiment === "Positive"
                          ? "bg-green-100 text-green-700"
                          : review.sentiment === "Negative"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {review.sentiment}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-3"
                style={{ color: "var(--text-secondary)" }}>
                    {review.review}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {(review.themes || []).map((theme) => (
                      <span
                        key={theme}
                        className="bg-[#F8ECEA] text-[#6E3B3B] px-2 py-1 rounded-full text-xs"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedReview(review)}
                    className="px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => setEditingReview({ ...review })}
                    className="px-3 py-2 rounded-lg bg-yellow-50 text-yellow-700 text-sm font-medium hover:bg-yellow-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteReviewId(review.id)}
                    className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* View Details Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#6E3B3B]">
              Review Details
            </h2>

            <div className="mt-5 space-y-4">
              <p>
                <strong>Guest:</strong> {selectedReview.guestName}
              </p>

              <div>
                <strong>Review:</strong>
                <p className="mt-1 text-gray-700">{selectedReview.review}</p>
              </div>

              <p>
                <strong>Sentiment:</strong> {selectedReview.sentiment}
              </p>

              <p>
                <strong>Themes:</strong>{" "}
                {(selectedReview.themes || []).join(", ") || "None"}
              </p>

              <div>
                <strong>AI Response:</strong>
                <div className="bg-gray-50 rounded-lg p-3 mt-1 text-gray-700 whitespace-pre-line">
                  {selectedReview.aiResponse}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedReview(null)}
                className="bg-[#6E3B3B] text-white px-5 py-2 rounded-lg hover:bg-[#582e2e] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl">
            <h2 className="text-2xl font-bold text-[#6E3B3B]">Edit Review</h2>

            <label className="block mt-4 text-sm font-medium text-gray-700">
              Guest Name
            </label>
            <input
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6E3B3B]/30"
              value={editingReview.guestName || ""}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  guestName: e.target.value,
                })
              }
            />

            <label className="block mt-4 text-sm font-medium text-gray-700">
              AI Response
            </label>
            <textarea
              rows="5"
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6E3B3B]/30"
              value={editingReview.aiResponse || ""}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  aiResponse: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingReview(null)}
                className="border px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                className="bg-[#6E3B3B] text-white px-5 py-2 rounded-lg hover:bg-[#582e2e] transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteReviewId && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-[380px] text-center">
            <h2 className="text-xl font-bold text-red-600">Delete Review?</h2>

            <p className="text-gray-500 mt-3">This action cannot be undone.</p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setDeleteReviewId(null)}
                className="border px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
);
};



export default ReviewArchive;