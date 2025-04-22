/**
 * 使用 Flatten 結構資料，搭配遞迴元件，呈現樹狀結構 UI
 * React Document：Avoid deeply nested state
 * https://18.react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state
 */
import { useState } from 'react';
import { initialTravelPlan } from './placesDataWithFlatten';

interface Place {
  id: number;
  title: string;
  childIds: Array<number>;
}

const PlaceTree = ({ placeId, allPlaces }: { placeId: number; allPlaces: Record<number, Place> }) => {
  const place = allPlaces[placeId];
  const childIds = place.childIds;

  return (
    <li>
      {place.title}
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childId) => (
            <PlaceTree key={childId} placeId={childId} allPlaces={allPlaces} />
          ))}
        </ol>
      )}
    </li>
  );
};

const TravelPlan = () => {
  const [plan] = useState(initialTravelPlan);
  const root = plan[0];
  const planetIds = root.childIds;

  return (
    <ol style={{ textAlign: 'left' }}>
      {planetIds.map((id) => (
        <PlaceTree key={id} placeId={id} allPlaces={plan} />
      ))}
    </ol>
  );
};

export default TravelPlan;
