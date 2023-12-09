import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./test.css";

// todo: 极快速滚动出现白屏，DOM来不及添加 -> 加入防抖，后续使用IntersectionObserver

/**
 * 核心变量：容器高度、当前可视区域起始索引、当前可视区域结束索引、当前可视区域的数据
 * @constructor
 */

const itemHeight = 100;
const total = 10000;
let id = 0;

function App() {
  const ref = (useRef < HTMLDivElement) | (null > null);

  // 可视区域高度
  const containerHeight = document.body.clientHeight;
  // 可显示的列表项数
  const visibleCount = Math.floor(containerHeight / itemHeight);

  // 所有的数据
  const [listData, setListData] =
    useState < { id: number, content: number, top: number } > [];
  // 偏移量
  const [startOffset, setStartOffset] = useState(0);
  // 起始索引
  const [start, setStart] = useState(0);
  // 结束索引
  // 列表宗高度
  const listHeight = useMemo(() => {
    return listData.length * itemHeight;
  }, [listData]);

  // 获取真实显示列表数据
  const visibleData = useMemo(() => {
    // 前后设置缓冲区域
    const visibleStart = Math.max(0, start - visibleCount);
    const visibleEnd = Math.min(listData.length, start + visibleCount * 2);
    return listData.slice(visibleStart, visibleEnd);
  }, [listData, start, visibleCount]);

  // 产生随机数据
  const genTenListData = useCallback(
    (offset = 0) => {
      if (listData.length >= total) {
        return [];
      }

      return new Array(10).fill({}).map((_, idx) => ({
        id: id++,
        content: Math.random() * 1000,
        top: idx * itemHeight + offset,
      }));
    },
    [listData]
  );

  useEffect(() => {
    const data = genTenListData();
    setListData(data);
  }, []);

  const handleScroll = useCallback(() => {
    const dom = ref.current;
    if (dom) {
      const scrollTop = dom.scrollTop;
      const listTotalHeight = dom.scrollHeight;

      const start = Math.floor(scrollTop / itemHeight);
      const end = start + visibleCount;
      setStart(start);
      if (end >= listData.length) {
        // 代表滚动到底部，需要增加元素
        const data = listData.concat(
          genTenListData(listData.length * itemHeight)
        );
        setListData(data);
      }

      setStartOffset(scrollTop);
    }
  }, [containerHeight, genTenListData, listData, visibleCount]);

  useEffect(() => {
    const dom = ref.current;
    if (dom) {
      dom.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (dom) {
        dom.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // 之后再瀑布流中，我们将会维护一个table，以页数pageIdx作为key，记录当前页的startIdx和endIdx
  // 滚动时，通过scrollTop判断当前所处的页数（用scrollTop / containerHeight，进而拿到startIdx和endIdx
  // 用transform调用gpu而非top来提升性能
  return (
    <div className="App" ref={ref}>
      <div
        className={"list-wrapper"}
        style={{ height: Math.max(listHeight, containerHeight + 1) }}
      >
        <div className={"list"}>
          {visibleData.map((data) => (
            <div
              key={data.id}
              className={"list-item"}
              style={{
                height: `${itemHeight}px`,
                background: "aqua",
                transform: `translateY(${data.top}px)`,
              }}
            >
              <h1>{data.id}</h1>
              {data.top}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
