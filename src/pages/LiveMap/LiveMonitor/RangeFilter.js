import React from 'react'
import { Range } from "react-range";
const RangeFilter = ({graphData,startIndex,setStartIndex ,endIndex, setEndIndex}) => {
   
    const handleRangeChange = (values) => {
   
        const sortedValues = values.sort((a, b) => a - b);
        setStartIndex(sortedValues[0]);
        setEndIndex(sortedValues[1]);
      };
  return (
    <>
       {graphData[0].data.length > 0 && (
            <Range
              step={1}
              min={0}
              max={graphData[0].data.length - 1}
              values={[startIndex, endIndex]}
              onChange={(values) => handleRangeChange(values)}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: `linear-gradient(to right, #ccc ${
                        (startIndex / (graphData[0].data.length - 1)) * 100
                      }%, #548BF4 ${
                        (startIndex / (graphData[0].data.length - 1)) * 100
                      }%, #548BF4 ${
                        (endIndex / (graphData[0].data.length - 1)) * 100
                      }%, #ccc ${
                        (endIndex / (graphData[0].data.length - 1)) * 100
                      }%)`,
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "16px",
                    width: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#FFF",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                />
              )}
            />
          )}
    </>
  )
}

export default RangeFilter
