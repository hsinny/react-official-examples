/**
 * 使用遞迴元件，呈現樹狀結構資料
 * React Document：Avoid deeply nested state
 * https://18.react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state
 */
import { useState } from 'react';
import { initialTravelPlan } from './placesDataWithNested';

interface Place {
  id: number;
  title: string;
  childPlaces: Place[];
}

const PlaceTree = ({ place, onDelete }: { place: Place; onDelete: (placeId: number) => void }) => {
  const childPlaces = place.childPlaces;

  return (
    <li>
      {place.title}
      <button onClick={() => onDelete(place.id)}>Delete</button>
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map((place) => (
            <PlaceTree key={place.id} place={place} onDelete={onDelete} />
          ))}
        </ol>
      )}
    </li>
  );
};

const TravelPlan = () => {
  const [plan, setPlan] = useState<Place>(initialTravelPlan);
  const places = plan.childPlaces;

  const handleDelete = (idToRemove: number) => {
    setPlan((prevPlan) => removePlaceById(prevPlan, idToRemove));
  };

  return (
    <ol style={{ textAlign: 'left' }}>
      {places.map((place) => (
        <PlaceTree key={place.id} place={place} onDelete={handleDelete} />
      ))}
    </ol>
  );
};

// 遞迴移除指定 id 的節點
function removePlaceById(place: Place, idToRemove: number): Place {
  return {
    ...place,
    childPlaces: place.childPlaces
      .filter((child) => child.id !== idToRemove)
      .map((child) => removePlaceById(child, idToRemove)),
  };
}

export default TravelPlan;
