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

const PlaceTree = ({ place }: { place: Place }) => {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map((place) => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
};

const TravelPlan = () => {
  const [plan] = useState(initialTravelPlan);
  const places = plan.childPlaces;

  return (
    <ol style={{ textAlign: 'left' }}>
      {places.map((place) => (
        <PlaceTree key={place.id} place={place} />
      ))}
    </ol>
  );
};

export default TravelPlan;
