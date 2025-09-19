export const CustomTree = ({ familyTree }) => {
  const calcChild1Top = (position) => {
    return position * -12;
  };

  const calcChild2Top = (position) => {
    return position * 12;
  };
  return (
    <div className="myTree relative" style={{ top: "50%", background: "red" }}>
      {familyTree.children.map((child, i) => (
        <div
          className="absolute"
          style={{
            top: i == 0 ? calcChild1Top(5) : calcChild2Top(5),
          }}
        >
          <div
            style={{ top: i == 0 ? calcChild1Top(1) : calcChild2Top(1) }}
            className="absolute left-100"
          >
            <div className={i === 0 ? "top-border" : "bottom-top-border"}></div>
            <div
              className={i === 0 ? "left-border" : "bottom-left-border"}
            ></div>
            <div className={i === 0 ? "top-bracket" : "bottom-bracket"}>
              <label>{child.name}</label>
            </div>
            {child.children.map((child1, i) => (
              <div
                className="absolute"
                style={{
                  top: i == 0 ? calcChild1Top(5) : calcChild2Top(5),
                }}
              >
                <div
                  style={{
                    top: i == 0 ? calcChild1Top(2) : calcChild2Top(2),
                  }}
                  className="absolute left-48"
                >
                  <div
                    className={i === 0 ? "top-border" : "bottom-top-border"}
                  ></div>
                  <div
                    className={i === 0 ? "left-border" : "bottom-left-border"}
                  ></div>
                  <div className={i === 0 ? "top-bracket" : "bottom-bracket"}>
                    <label>{child1.name.slice(0, 30)}</label>
                  </div>
                  {child1.children &&
                    child1.children.map((child2, i) => (
                      <div
                        className="absolute"
                        style={{
                          top: i == 0 ? calcChild1Top(1.5) : calcChild2Top(1.5),
                        }}
                      >
                        <div
                          style={{
                            top: i == 0 ? calcChild1Top(2) : calcChild2Top(2),
                          }}
                          className="absolute left-56"
                        >
                          <div
                            className={
                              i === 0 ? "top-border" : "bottom-top-border"
                            }
                          ></div>
                          <div
                            className={
                              i === 0 ? "left-border" : "bottom-left-border"
                            }
                          ></div>
                          <div
                            className={
                              i === 0 ? "top-bracket" : "bottom-bracket"
                            }
                          >
                            <label>{child2.name.slice(0, 30)}</label>
                          </div>
                          <div>
                            {child2.children &&
                              child2.children.map((child3, i) => (
                                <div
                                  style={{
                                    top:
                                      i == 0
                                        ? calcChild1Top(2)
                                        : calcChild2Top(2),
                                  }}
                                  className="absolute left-72 bg-red-500 border-2"
                                >
                                  <div
                                    className={
                                      i === 0
                                        ? "top-border"
                                        : "bottom-top-border"
                                    }
                                  ></div>
                                  <div
                                    className={
                                      i === 0
                                        ? "left-border"
                                        : "bottom-left-border"
                                    }
                                  ></div>
                                  <div
                                    className={
                                      i === 0 ? "top-bracket" : "bottom-bracket"
                                    }
                                  >
                                    <span className="text-xs">
                                      {child3.name.slice(0, 30)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
