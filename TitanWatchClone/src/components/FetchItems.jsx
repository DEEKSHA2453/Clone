import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        dispatch(fetchStatusActions.markFetchingStarted());
        const response = await fetch("http://localhost:8000/items", { signal });
        const data = await response.json();
        
        dispatch(itemsActions.addInitialItems(data.items)); // Assuming items is the correct data format
        dispatch(fetchStatusActions.markFetchDone());
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      } finally {
        dispatch(fetchStatusActions.markFetchingFinished());
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [fetchStatus, dispatch]);

  return null;
};

export default FetchItems;
