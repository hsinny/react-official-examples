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

const PlaceTree = ({
  parentId,
  placeId,
  allPlaces,
  onDelete,
}: {
  parentId: number;
  placeId: number;
  allPlaces: Record<number, Place>;
  onDelete: (parentId: number, childId: number) => void;
}) => {
  const place = allPlaces[placeId];
  const childIds = place.childIds;

  return (
    <li>
      {place.title}
      <button onClick={() => onDelete(parentId, placeId)}>Delete</button>
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childId) => (
            <PlaceTree key={childId} parentId={place.id} placeId={childId} allPlaces={allPlaces} onDelete={onDelete} />
          ))}
        </ol>
      )}
    </li>
  );
};

const TravelPlan = () => {
  const [plan, setPlan] = useState<Record<number, Place>>(initialTravelPlan);
  const root = plan[0];
  const planetIds = root.childIds;

  const handlePlaceDelete = (parentId: number, placeId: number) => {
    const parent = plan[parentId];

    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParentPlace = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== placeId),
    };

    // Update the root state object...
    const nextPlan = {
      ...plan,
      // ...so that it has the updated parent.
      [parentId]: nextParentPlace,
    };

    setPlan(nextPlan);
  };

  return (
    <ol style={{ textAlign: 'left' }}>
      {planetIds.map((id) => (
        <PlaceTree key={id} parentId={0} placeId={id} allPlaces={plan} onDelete={handlePlaceDelete} />
      ))}
    </ol>
  );
};

export default TravelPlan;
