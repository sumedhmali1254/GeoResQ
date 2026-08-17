import { useState, useEffect } from 'react';
import ResourceCard from '../../components/ResourceCard';
import RecommendationPanel from '../../components/RecommendationPanel';
import { getResources } from '../../services/mockApi';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getResources();
      setResources(res.data.resources);
      setRecommendations(res.data.recommendations);
    }
    load();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Resource Dashboard</h1>
      <p className="page-subtitle">Resource allocation, deployment tracking, and decision-engine recommendations</p>

      {/* Recommendation Panel */}
      <div className="mb-6">
        <RecommendationPanel recommendations={recommendations} title="Allocation Recommendations" />
      </div>

      {/* Resource Cards */}
      <div className="section-title mb-3">Active Resources</div>
      <div className="grid-cards">
        {resources.map((resource, i) => (
          <ResourceCard key={resource.id} resource={resource} index={i} />
        ))}
      </div>
    </div>
  );
}
