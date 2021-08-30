export default class Task {
  constructor(
    id,
    label,
    user,
    start,
    duration,
    type,
    parentId,
    index,
    classId,
    priority,
    priorityColor,
    percent,
    collapsed,
    status,
    description,
    target,
    service,
    shortDescription,
    dependent,
    initiator,
    owner,
    categoryName,
    initiatorFullName
  ) {
    this.id = id;
    this.label = label;
    this.user = user;
    this.start = start;
    this.duration = duration;
    this.type = type;
    this.parentId = parentId;
    this.index = index;
    this.classId = classId;
    this.priority = priority;
    this.percent = percent;
    this.collapsed = collapsed;
    this.status = status;
    this.description = description;
    this.target = target;
    this.service = service;
    this.priorityColor = priorityColor;
    this.shortDescription = shortDescription;
    this.dependentOn = dependent;
    this.initiator = initiator;
    this.owner = owner;
    this.style = {
      base: {
        fill: priorityColor,
        stroke: "#bdd0da",
      },
    };
    this.categoryName = categoryName;
    this.initiatorFullName = initiatorFullName;
  }
}
