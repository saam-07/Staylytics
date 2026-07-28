import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { reviewsApi } from "../services/reviewsApi";

function FeatureCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${className}`}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        boxShadow: "0 4px 20px rgba(155,35,53,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await reviewsApi.getAll();
        setReviews(data || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const dashboardData = useMemo(() => {
    const totalReviews = reviews.length;

    let positive = 0;
    let neutral = 0;
    let negative = 0;

    const themeCount = {};
    const negativeThemeCount = {};

    reviews.forEach((review) => {
      const sentiment = (review.sentiment || "").toLowerCase();

      if (sentiment === "positive") positive++;
      else if (sentiment === "negative") negative++;
      else neutral++;

      (review.themes || []).forEach((theme) => {
        themeCount[theme] = (themeCount[theme] || 0) + 1;

        if (sentiment === "negative") {
          negativeThemeCount[theme] =
            (negativeThemeCount[theme] || 0) + 1;
        }
      });
    });

    const positivePercentage =
      totalReviews === 0
        ? 0
        : Math.round((positive / totalReviews) * 100);

    const propertyScore =
      totalReviews === 0
        ? 0
        : Math.round(
            (positive * 100 + neutral * 60 + negative * 20) /
              totalReviews
          );

    const topTheme =
      Object.entries(themeCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "No data";

    const recommendation =
      Object.entries(negativeThemeCount).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || "Maintain current service quality";

    const pendingReplies = reviews.filter(
      (r) => !r.aiResponse && !r.ai_response
    ).length;

    const guestMood =
      positivePercentage >= 70
        ? "Positive"
        : positivePercentage >= 40
        ? "Neutral"
        : "Needs Attention";

    const trend =
      propertyScore >= 80
        ? "+Excellent"
        : propertyScore >= 60
        ? "+Stable"
        : "+Needs Work";

    return {
      totalReviews,
      positive,
      neutral,
      negative,
      positivePercentage,
      propertyScore,
      topTheme,
      recommendation,
      pendingReplies,
      guestMood,
      trend,
    };
  }, [reviews]);

  const stats = [
    {
      title: "Total Reviews",
      value: dashboardData.totalReviews,
      subtitle: "Analyzed Reviews",
    },
    {
      title: "Positive Reviews",
      value: `${dashboardData.positivePercentage}%`,
      subtitle: "Guest Satisfaction",
    },
    {
      title: "Pending Replies",
      value: dashboardData.pendingReplies,
      subtitle: "Awaiting Response",
    },
    {
      title: "Top Theme",
      value: dashboardData.topTheme,
      subtitle: "Most Mentioned",
    },
  ];

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-hero)" }}
      >
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Loading Dashboard...
        </h2>
      </main>
    );
  }

  return (
    <main
  className="min-h-screen px-8 pt-32 pb-16"
  style={{ backgroundColor: "var(--bg-hero)" }}
>
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="mb-12">
      <p
        className="uppercase tracking-widest text-xs font-semibold mb-4"
        style={{ color: "var(--text-accent)" }}
      >
        Dashboard
      </p>

      <h1
        className="font-bold leading-tight mb-4"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
          color: "var(--text-primary)",
        }}
      >
        Monitor your property's performance.
      </h1>

      <p
        className="max-w-xl text-base leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        Live insights generated from your analyzed guest reviews.
      </p>
    </div>
          {/* Property Score + Guest Mood */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">

        {/* Property Score */}
        <FeatureCard className="p-8">
          <p
            className="uppercase tracking-widest text-xs font-semibold mb-5"
            style={{ color: "var(--text-accent)" }}
          >
            Property Health Score
          </p>

          <div className="flex items-end justify-between">
            <div>
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  color: "var(--text-primary)",
                  lineHeight: 1,
                }}
              >
                {dashboardData.propertyScore}
                <span
                  className="text-xl ml-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  /100
                </span>
              </h2>

              <p
                className="text-sm mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Based on {dashboardData.totalReviews} analyzed reviews
              </p>
            </div>

            <div
              className="rounded-2xl px-6 py-5 text-center"
              style={{
                backgroundColor: "rgba(155,35,53,0.06)",
                border: "1px solid var(--border-card)",
              }}
            >
              <p
                className="uppercase tracking-widest text-xs font-semibold mb-2"
                style={{ color: "var(--text-accent)" }}
              >
                Overall Status
              </p>

              <h3
                className="text-3xl font-bold"
                style={{
                  color: "var(--text-accent)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {dashboardData.trend}
              </h3>

              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Current Performance
              </p>
            </div>
          </div>
        </FeatureCard>

        {/* Guest Mood */}
        <FeatureCard className="p-8">
          <p
            className="uppercase tracking-widest text-xs font-semibold mb-5"
            style={{ color: "var(--text-accent)" }}
          >
            Guest Mood
          </p>

          <div className="flex items-center justify-between h-full">
            <div>
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.7rem,3vw,2.3rem)",
                  color: "var(--text-primary)",
                }}
              >
                {dashboardData.guestMood}
              </h2>

              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Based on all analyzed reviews
              </p>
            </div>

            <div className="text-center">
              <h2
                className="font-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.8rem,5vw,4rem)",
                  color: "var(--text-accent)",
                  lineHeight: 1,
                }}
              >
                {dashboardData.positivePercentage}%
              </h2>

              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Positive Reviews
              </p>
            </div>
          </div>
        </FeatureCard>

      </div>

      {/* Dynamic Stat Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {stats.map((item) => (
          <FeatureCard key={item.title} className="p-6">
            <p
              className="uppercase text-xs tracking-widest mb-4 font-semibold"
              style={{ color: "var(--text-accent)" }}
            >
              {item.title}
            </p>

            <h2
              className="font-bold mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem,4vw,3rem)",
                color: "var(--text-primary)",
                lineHeight: 1,
              }}
            >
              {item.value}
            </h2>

            <p
              className="text-sm mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              {item.subtitle}
            </p>
          </FeatureCard>
        ))}
      </div>
            {/* AI Recommendation + Side Card */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* AI Recommendation */}
        <FeatureCard className="lg:col-span-2 p-8">
          <p
            className="uppercase tracking-widest text-xs font-semibold mb-4"
            style={{ color: "var(--text-accent)" }}
          >
            AI Recommendation
          </p>

          <h2
            className="font-bold mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
              color: "var(--text-primary)",
            }}
          >
            Focus on improving {dashboardData.recommendation}.
          </h2>

          <p
            className="leading-7 text-sm mb-8 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            This recommendation is generated from your analyzed guest
            reviews. The most frequent concern appearing in negative
            feedback is{" "}
            <strong>{dashboardData.recommendation}</strong>. Resolving
            this issue is likely to improve overall guest satisfaction
            and increase future positive reviews.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/review-archive"
              className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: "var(--btn-primary)" }}
            >
              View Review Archive
            </Link>

            <Link
              to="/reviews"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                border: "1px solid var(--border-card)",
                color: "var(--text-accent)",
              }}
            >
              Analyze New Review
            </Link>
          </div>
        </FeatureCard>

        {/* Summary Card */}
        <FeatureCard className="p-8 flex flex-col justify-between">

          <div>
            <p
              className="uppercase tracking-widest text-xs font-semibold mb-4"
              style={{ color: "var(--text-accent)" }}
            >
              Dashboard Summary
            </p>

            <h3
              className="font-bold mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.2rem,2vw,1.5rem)",
                color: "var(--text-primary)",
              }}
            >
              {dashboardData.guestMood} Guest Experience
            </h3>

            <div
              className="space-y-3 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <p>
                • Positive Reviews : <strong>{dashboardData.positive}</strong>
              </p>

              <p>
                • Neutral Reviews : <strong>{dashboardData.neutral}</strong>
              </p>

              <p>
                • Negative Reviews : <strong>{dashboardData.negative}</strong>
              </p>

              <p>
                • Most Discussed Theme :{" "}
                <strong>{dashboardData.topTheme}</strong>
              </p>
            </div>
          </div>

          <div
            className="mt-8 pt-6"
            style={{
              borderTop: "1px solid var(--border-card)",
            }}
          >
            <p
              className="text-xs mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Reviews Analyzed
            </p>

            <h2
              className="font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem,4vw,3.5rem)",
                color: "var(--text-accent)",
                lineHeight: 1,
              }}
            >
              {dashboardData.totalReviews}
            </h2>
          </div>

        </FeatureCard>

      </div>

    </div>
  </main>
);
}