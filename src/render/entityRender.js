function processLabelElement(element) {
  if (element.children) {
    for (const e of element.children) {
      const labels = element.label;

      if (e.type === DomType.Run && labels && labels.length) {
        const childrenTemp = [];

        e.children.forEach((item) => {
          const obj = {
            children: [],
          };
          const textAllMatch = labels.filter((_) => _.value.trim() === item.text.trim());
          const arr = labels.filter((_) => _.value.includes(e.text));

          // 全部匹配
          if (textAllMatch.length) {
            obj.labelEntity = textAllMatch[0].entity;

            const index = labels.findIndex((_) => _ === item.labelEntity);

            obj.cssStyle = {
              color: getColors(
                index === -1 ? this.labelEntityArr.push(item.labelEntity) - 1 : index,
              ),
            };
            obj.type = 'run';
            obj.children.push(item);

            childrenTemp.push(obj);
          } else if (arr.length) {
            console.log(item);
          } else {
            childrenTemp.push(item);
          }
        });

        e.children = childrenTemp;
      } else {
        this.processLabelElement(e);
      }
    }
  }
}
