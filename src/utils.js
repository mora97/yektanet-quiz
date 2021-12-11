const tree = {}

export const convertDateToTime = (date) => {
    const seperateDate = date.split("-");
    return new Date(
        seperateDate[0],
        seperateDate[1],
        seperateDate[2]
    ).getTime();
};

export const createBST = (mockData) => {
    mockData.forEach((data, index) => {
        const time = convertDateToTime(data.date);
        if (index === 0) {
            tree[time] = {
                items: [data],
                rightChild: null,
                leftChild: null,
            };
        } else {
            insertBSTNode(time, data, convertDateToTime(mockData[0].date));
        }
    });

    return tree
}


const insertBSTNode = (time, item, nodeIndex) => {
    if (nodeIndex < time) {
        if (tree[nodeIndex].rightChild) {
            insertBSTNode(time, item, tree[nodeIndex].rightChild);
        } else {
            tree[nodeIndex].rightChild = time;
            tree[time] = {
                items: [item],
                rightChild: null,
                leftChild: null,
            };
        }
    } else if (nodeIndex > time) {
        if (tree[nodeIndex].leftChild) {
            insertBSTNode(time, item, tree[nodeIndex].leftChild);
        } else {
            tree[nodeIndex].leftChild = time;
            tree[time] = {
                items: [item],
                rightChild: null,
                leftChild: null,
            };
        }
    } else if (nodeIndex === time) {
        tree[nodeIndex].items.push(item);
    }

    return
};