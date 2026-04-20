import { useEffect, useEffectEvent, useRef, useState } from "react";

const ITEMS_PER_BATCH = 12;

function createItems(startIndex, count) {
  return Array.from({ length: count }, function (_, index) {
    const itemNumber = startIndex + index + 1;

    return {
      id: itemNumber,
      title: "Item " + itemNumber,
      description:
        "This card was added automatically as the observer reached the end of the list."
    };
  });
}

const App = function () {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadTriggerRef = useRef(null);

  const loadMoreItems = useEffectEvent(function () {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    window.setTimeout(function () {
      setItems(function (previousItems) {
        const nextItems = createItems(previousItems.length, ITEMS_PER_BATCH);
        setIsLoading(false);
        return previousItems.concat(nextItems);
      });
    }, 350);
  });

  useEffect(function () {
    loadMoreItems();
  }, []);

  useEffect(function () {
    const triggerElement = loadTriggerRef.current;

    if (!triggerElement) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          loadMoreItems();
        }
      },
      {
        rootMargin: "160px 0px"
      }
    );

    observer.observe(triggerElement);

    return function () {
      observer.disconnect();
    };
  }, []);

  function handleReset() {
    setItems([]);
    setIsLoading(false);
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <h1>Infinite scroll</h1>
        <p className="hero-copy">
          This example loads content in small batches as you approach the end
          of the page, using Intersection Observer for smoother performance.
        </p>

        <div className="hero-actions">
          <button type="button" onClick={handleReset}>
            Restart demo
          </button>
          <span className="counter">{items.length} items loaded</span>
        </div>
      </section>

      <section className="card-grid" aria-label="Infinite scroll items">
        {items.map(function (item) {
          return (
            <article key={item.id} className="item-card">
              <span className="item-badge">#{item.id}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          );
        })}
      </section>

      <div ref={loadTriggerRef} className="load-trigger" aria-hidden="true" />

      <section className="status-panel" aria-live="polite">
        {isLoading ? <p>Loading more items...</p> : null}
        {!isLoading ? <p>Scroll down to keep loading more items.</p> : null}
      </section>
    </main>
  );
};

export default App;
