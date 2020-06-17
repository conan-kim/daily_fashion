// object를 array로 여러개 받았을 때, key값을 기반으로 중복 데이터를 제거한다.
// object가 누적되는데 중복되는 데이터들이 있어 key값을 기반으로 중복을 제거하기 위해 사용한다. 
export const getUniqueObjects = (duplicatedObjects, keyName) => {
  const keyData = [];
  const uniqueData = [];
  for (const iterator of duplicatedObjects) {
    if (keyData.includes(iterator[keyName]) === false) {
      keyData.push(iterator[keyName]);
      uniqueData.push(iterator);
    }
  }
  return uniqueData;
};

// object들을 array로 여러개 받았을 때, 특정 데이터를 제거함.
// skip 버튼을 눌러서 array에서 object를 삭제하는 경우에 사용한다.
export const deleteObjectinArray = (arr, keyName, data) => {
  const newData = [];
  for (const iterator of arr) {
    if (iterator[keyName] !== data) {
      newData.push(iterator);
    }
  }
  return newData;
};
