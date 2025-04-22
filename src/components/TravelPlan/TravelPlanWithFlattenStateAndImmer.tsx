/**
 * 使用 Flatten 結構資料，搭配遞迴元件，呈現樹狀結構 UI，使用 immer 更新 state
 * React Document：Avoid deeply nested state
 * https://18.react.dev/learn/choosing-the-state-structure#improving-memory-usage
 */
import { useImmer } from 'use-immer';
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
  if (!allPlaces[placeId]) {
    return null;
  }

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
  const [plan, updatePlan] = useImmer<Record<number, Place>>(initialTravelPlan);
  const root = plan[0];
  const planetIds = root.childIds;

  const handlePlaceDelete = (parentId: number, placeId: number) => {
    updatePlan((draft) => {
      draft[parentId].childIds = draft[parentId].childIds.filter((id) => id !== placeId);

      // 另外刪除 subtree 中的子地點
      const deleteAllChildren = (id: number) => {
        const place = draft[id];
        place.childIds.forEach(deleteAllChildren);
        delete draft[id];
      };

      deleteAllChildren(placeId);
    });
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
