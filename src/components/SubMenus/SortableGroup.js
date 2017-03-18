class SortableGroup{
  checkList() {
    let lists = this.getRefs();
    let {target, current, delta, pageX, pageY} = this.dragInfo;
    let t = this.center(target);
    let closest = this.closestList(t.x, t.y, lists);

    // closest list is not the current list
    if (current != closest) {

      if (this.shouldCancelListJump && this.shouldCancelListJump(current, closest)) {
        console.info('list jump cancelled');
        return false;
      }

      //console.log('doing list jump...', current, closest);

      t = this.center(target);
      let itemContainer = lists[closest].getSortableItemContainer(); // TODO: default to list.container
      let newIndex = this.closestNodeIndex(t.x, t.y, itemContainer.childNodes);

      //console.log('stop dragging:', current);

      // stop dragging from the prev list (calls onSortEnd)
      lists[current].handleSortEnd({});

      //console.log('start dragging:', closest);

      // start dragging from the closest list
      this.startDragging(closest, newIndex, delta, pageX, pageY);

      this.dragInfo.current = closest;
    }
  };

  closestList(x, y, lists) {
    let list;
    let d = 0;
    let sd = 999999999;
    let listName;
    lists.map((c,key) => {
      let list_rect = c.container.getBoundingClientRect();
      let rect = {
        min: {x: list_rect.left, y: list_rect.top},
        max: {x: list_rect.right, y: list_rect.bottom}
      };
      let point = {x, y}
      d = this.distance_rect_point(rect, point);
      //console.log(key, d, sd);
      if (d < sd) {
        sd = d;
        listName = key;
      }
    });
    return listName;
  }
}

export default SortableGroup;
