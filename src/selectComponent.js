import React, { useState, useEffect, useRef } from "react";
const tickIcon = require("./images/tick.png");
const crossIcon = require("./images/cross.png");
const SelectComponent = props => {
  const { data, callParent } = props;
  const [menuOpen, toggleMenu] = useState(false);
  const [openLiItemIndex, updateIndex] = useState(NaN);
  const [selectedList, updateSelectedList] = useState([]);
  const clickhandlerRef = useRef(null);
  const [filteredList, updateFiltedList] = useState([]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // return document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = event => {
    if (
      clickhandlerRef.current &&
      !clickhandlerRef.current.contains(event.target)
    ) {
      closeDropDown();
    }
  };

  const addChildItem = itemData => {
    let arrayValue = itemData.value.map(item => ({
      category: itemData.category,
      value: item
    }));
    updateSelectedList([...selectedList, ...arrayValue]);
  };

  const addChildSubItem = itemData => {
    updateSelectedList([...selectedList, itemData]);
  };

  const removeItem = item => {
    let found = false;
    const newList = selectedList.filter(el => {
      if (el.category === item.category && el.value === item.value && !found) {
        found = true;
        return;
      }
      return el;
    });
    updateSelectedList(newList);
  };

  const closeDropDown = () => {
    toggleMenu(false);
    updateIndex(NaN);
    updateSelectedList([]);
  };

  const filterListItem = value => {
    let timer;
    return function(event) {
      let value = event.target.value;
      clearTimeout(timer);
      timer = setTimeout(() => {
        let newArray = [];
        for (let item of data) {
          for (let subitem of item.value) {
            if (subitem === value) {
              newArray.push({ category: item.category, value: subitem });
            }
          }
        }
        updateFiltedList(newArray);
      }, 300);
    };
  };

  const addFilteredList = item => {
    updateSelectedList([
      ...selectedList,
      { category: item.category, value: item.value }
    ]);
  };

  const ShowSelectedItems = () => {
    return (
      <ul style={{ listStyleType: "none" }}>
        {selectedList.map(item => (
          <li className="smallLi">
            {item.value}
            <img
              src={crossIcon}
              alt=""
              onClick={() => removeItem(item)}
              className="icon-main imageContainer"
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dropdown">
      <button
        onClick={() => {
          toggleMenu(true);
          callParent([]);
        }}
      >
        {props.buttonName}
      </button>
      {menuOpen && (
        <div ref={clickhandlerRef} className="dropDown-container">
          <input
            className="inputElm"
            placeholder="Search by name"
            onChange={filterListItem()}
          />
          <div className="dropdown-content popContainer">
            <ul className="ulEmptyMain">
              {filteredList.length === 0 ? (
                data.map((item, index) => {
                  return (
                    <li
                      className="main-li elemeBlock"
                      onClick={() => updateIndex(index)}
                    >
                      <div className="displayFlexColumn">
                        <p>
                          {item.category}
                          <img
                            src={tickIcon}
                            alt=""
                            onClick={() => addChildItem(item)}
                            className="icon-main imageContainer"
                          />
                        </p>
                        {openLiItemIndex === index && (
                          <ul
                            style={{
                              listStyleType: "none"
                            }}
                          >
                            {item.value.map(subItem => (
                              <li className="displayFlexUl">
                                <p>{subItem}</p>
                                <img
                                  src={tickIcon}
                                  className="icon-main imageContainer"
                                  alt=""
                                  onClick={() =>
                                    addChildSubItem({
                                      category: item.category,
                                      value: subItem
                                    })
                                  }
                                  style={{
                                    marginTop: "15px"
                                  }}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                })
              ) : (
                <ul className="ulEmptyMain">
                  {filteredList.map(el => {
                    return (
                      <li
                        className="main-li elemeBlock"
                        onClick={() => addFilteredList(el)}
                      >
                        {el.category}--> {el.value}
                      </li>
                    );
                  })}
                </ul>
              )}
            </ul>
            {selectedList.length !== 0 && (
              <div className="rightBox">{ShowSelectedItems()}</div>
            )}
          </div>
          <div className="bottomContainer">
            <p
              onClick={() => {
                closeDropDown();
              }}
            >
              Close
            </p>
            <p
              onClick={() => {
                callParent(selectedList);
                closeDropDown();
              }}
            >
              Submit
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
