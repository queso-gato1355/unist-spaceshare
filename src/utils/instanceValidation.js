// 입력으로는 다양한 값의 json 객체를 받는다.
// 전체 입력을 확인해서 null, undefined, string일 때 길이가 0인 요소를 저장한다.
// 그리고 그러한 요소가 있다면 true, 그리고 그 요소를 반환한다.
// 없다면 false와 빈 객체를 반환한다.

export default function instanceValidation(obj) {
    let isEmpty = false;
    let emptyObj = {};
    for (let key in obj) {
        if (obj[key] === null || obj[key] === undefined || (typeof obj[key] === "string" && obj[key].length === 0)) {
            isEmpty = true;
            emptyObj[key] = true;
        }
    }
    return { isEmpty, emptyObj };
}