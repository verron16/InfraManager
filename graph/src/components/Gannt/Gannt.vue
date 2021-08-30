<template>
  <div id="gantt">
    <gantt-elastic
      v-if="loading"
      :options="options"
      :tasks="getFilteredTasks"
      ref="gannt"
      @chart-task-click="taskOnClicked"
      @chart-milestone-click="taskOnClicked"
    >
      <gantt-header slot="header" :options="options"></gantt-header>
    </gantt-elastic>
    <Spinner v-else></Spinner>
    <InfoCard
      v-if="getVisibleModal"
      :width="380"
      :height="500"
      :draggable="true"
      :show-overlay="true"
      @hideInfoCard="closeModal"
    >
      <template v-slot:content>
        <div class="modal-content">
          <div class="modal__request">
            <div
              class="request__color"
              :style="{ backgroundColor: priorityColor }"
            ></div>
            <h4
              class="request__title"
              v-if="currentLocale === 'ru-RU' && type === 'task'"
            >
              Задание {{ index }} от
              <span class="request__title-time">{{ startTimeHeader }}</span>
              <span class="request__title-time" v-if="status !== null">
                [{{ status }}]</span
              >
              <span class="request__title-time" v-else> [Не указан]</span>
            </h4>
            <h4
              class="request__title"
              v-if="currentLocale === 'ru-RU' && type === 'milestone'"
            >
              Запрос на изменение {{ index }} от
              <span class="request__title-time">{{ startTimeHeader }}</span>
              <span class="request__title-time" v-if="status !== null">
                [{{ status }}]</span
              >
              <span class="request__title-time" v-else> [Не указан]</span>
            </h4>
            <h4
              class="request__title"
              v-if="currentLocale === 'en-US' && type === 'milestone'"
            >
              Change request {{ index }} from
              <span class="request__title-time">{{ startTimeHeader }}</span>
              <span class="request__title-time" v-if="status !== null">
                [{{ status }}]</span
              >
              <span class="request__title-time" v-else> [Not specified]</span>
            </h4>
            <h4
              class="request__title"
              v-if="currentLocale === 'en-US' && type === 'task'"
            >
              Task {{ index }} from
              <span class="request__title-time">{{ startTimeHeader }}</span>
              <span class="request__title-time" v-if="status !== null">
                [{{ status }}]</span
              >
              <span class="request__title-time" v-else> [Not specified]</span>
            </h4>
          </div>
          <h3 class="modal__title">{{ shortDescription }}</h3>
          <div class="modal__info modal__info-description">
            <h3 class="modal-label" v-if="currentLocale === 'ru-RU'">
              Описание
            </h3>
            <h3 class="modal-label" v-else>Description</h3>
            <p class="modal__text" v-if="description !== ''">
              {{ description }}
            </p>
            <p class="modal__text" v-else>-</p>
          </div>
          <div class="modal__info modal__info-description">
            <h3 class="modal-label" v-if="currentLocale === 'ru-RU'">
              Категория
            </h3>
            <h3 class="modal-label" v-else>Category</h3>
            <p class="modal__text" v-if="categoryName !== ''">
              {{ categoryName }}
            </p>
            <p class="modal__text" v-if="categoryName === null">-</p>
          </div>
          <div
            class="modal__info modal__info-description"
            v-if="type !== 'task'"
          >
            <h3 class="modal-label" v-if="currentLocale === 'ru-RU'">Цель</h3>
            <h3 class="modal-label" v-else>Aim</h3>
            <p class="modal__text" v-if="target !== ''">{{ target }}</p>
            <p class="modal__text" v-else>-</p>
          </div>
          <div
            class="modal__info modal__info-description"
            v-if="type !== 'task'"
          >
            <h3 class="modal-label" v-if="currentLocale === 'ru-RU'">Сервис</h3>
            <h3 class="modal-label" v-else>Service</h3>
            <p class="modal__text" v-if="service !== '' && service != null">
              {{ service }}
            </p>
            <p class="modal__text" v-else>-</p>
          </div>
          <div class="modal__time">
            <div class="modal__time-started">
              <h3 class="modal-label" v-if="currentLocale === 'ru-RU'">
                Начало
              </h3>
              <h3 class="modal-label" v-else>Beginning</h3>
              <p class="time__date">{{ startTime }}</p>
            </div>
            <div class="modal__time-end">
              <h3 class="modal-label" v-if="currentLocale === 'ru-RU'">
                Окончание
              </h3>
              <h3 class="modal-label" v-else>Ending</h3>
              <p class="time__date">{{ endTime }}</p>
            </div>
          </div>
          <div class="modal-card" v-if="initiator !== null">
            <img
              src="@/assets/icons/Avatar.png"
              alt="avatar"
              class="modal-card__picture"
            />
            <div class="modal-card__content">
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'ru-RU' && type === 'milestone'"
              >
                Заявитель
              </h4>
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'en-US' && type === 'milestone'"
              >
                Applicant
              </h4>
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'ru-RU' && type === 'task'"
              >
                Инициатор
              </h4>
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'en-US' && type === 'task'"
              >
                Initiator
              </h4>
              <h3 class="modal-card__name" v-if="initiator.FullName !== ''">
                {{ initiator.FullName }}
              </h3>
              <p class="modal-card__num" v-if="initiator.Phone !== ''">
                {{ initiator.Phone }}
              </p>
              <p class="modal-card__post" v-if="initiator.PositionName !== ''">
                {{ initiator.PositionName }}
              </p>
              <p
                class="modal-card__place"
                v-if="initiator.SubdivisionFullName !== ''"
              >
                {{ initiator.SubdivisionFullName }}
              </p>
              <a
                :href="`mailto:${initiator.Email}`"
                class="modal-card__contacts-email"
                v-if="initiator.Email !== ''"
                >{{ initiator.Email }}</a
              >
            </div>
          </div>
          <div class="modal-card" v-if="owner !== null">
            <img
              src="@/assets/icons/Avatar.png"
              alt="avatar"
              class="modal-card__picture"
            />
            <div class="modal-card__content">
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'ru-RU' && type === 'milestone'"
              >
                Координатор
              </h4>
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'en-US' && type === 'milestone'"
              >
                Coordinator
              </h4>
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'ru-RU' && type === 'task'"
              >
                Исполнитель
              </h4>
              <h4
                class="modal-card__title"
                v-if="currentLocale === 'en-US' && type === 'task'"
              >
                Executor
              </h4>
              <h3 class="modal-card__name" v-if="owner.FullName !== ''">
                {{ owner.FullName }}
              </h3>
              <p class="modal-card__num" v-if="owner.Phone !== ''">
                {{ owner.Phone }}
              </p>
              <p class="modal-card__post" v-if="owner.PositionName !== ''">
                {{ owner.PositionName }}
              </p>
              <p
                class="modal-card__place"
                v-if="owner.SubdivisionFullName !== ''"
              >
                {{ owner.SubdivisionFullName }}
              </p>
              <a
                :href="`mailto:${owner.Email}`"
                class="modal-card__contacts-email"
                v-if="owner.Email !== ''"
                >{{ owner.Email }}
              </a>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:controls>
        <div class="modal-close">
          <button
            class="modal-close__btn button btn__second-priority"
            v-if="currentLocale === 'ru-RU'"
            @click="closeModal"
          >
            Закрыть
          </button>
          <button
            class="modal-close__btn button btn__second-priority"
            v-if="currentLocale === 'en-US'"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </template>
    </InfoCard>
  </div>
</template>

<style></style>

<script>
// Импорт основных модулей
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";

// Импорт прототипа запросов на изменение
import Task from "../../Prototypes/prototypeTask";

import InfoCard from "../UI/Components/InfoCard";
import Spinner from "../UI/Controls/Spinner";

// Все запросы и текущая локализация пользователя

let getLocale = "";

let options = {
  taskMapping: {
    progress: "percent",
  },
  maxRows: 1000,
  maxHeight: 500,
  title: {
    label: "Your project title as html (link or whatever...)",
    html: false,
  },
  row: {
    height: 24,
  },
  calendar: {
    hour: {
      display: true,
    },
  },
  chart: {
    progress: {
      bar: false,
    },
    expander: {
      display: true,
    },
  },
  taskList: {
    expander: {
      straight: true,
    },
    columns: [
      {
        id: 1,
        label: "#",
        value: (task) => task.index,
        width: 80,
        expander: true,
        html: true,
        sortable: true,
        sortValueName: "index",
        sortValue: 0,
        filter: false,
        filterActive: false,
      },
      {
        id: 2,
        label: "Краткое описание",
        value: (task) => task.shortDescription,
        width: 200,
        html: true,
        sortable: true,
        sortValueName: "shortDescription",
        sortValue: 0,
        filter: true,
        filterActive: false,
      },
      {
        id: 3,
        label: "Сервис",
        value: (task) => task.service,
        width: 170,
        html: true,
        sortable: true,
        sortValueName: "service",
        sortValue: 0,
        filter: true,
        filterActive: false,
      },
      {
        id: 4,
        label: "Координатор / Владелец",
        value: (task) => task.initiator.FullName,
        width: 185,
        html: true,
        sortable: true,
        sortValueName: "initiatorFullName",
        sortValue: 0, // 1 - по возрастанию, 2 - по убыванию, 0 - дефолтный порядок
        filter: true,
        filterActive: false,
      },
      {
        id: 5,
        label: "Дата начала работ",
        value: (task) => dayjs(task.start).format("DD.MM.YYYY"),
        width: 130,
        sortable: false,
        filter: false,
        filterActive: false,
      },
      {
        id: 6,
        label: "Длительность",
        value: (task) =>
          task.duration - 10800000 >= 86400000
            ? dayjs(task.duration).format("DD д. HH ч. mm м.")
            : dayjs(task.duration - 10800000).format("HH ч. mm м."),
        width: 110,
        style: {
          "task-list-item-value-container": {
            "text-align": "right",
          },
        },
        sortable: false,
        filter: false,
        filterActive: false,
      },
    ],
  },
  locale: {
    name: "ru",
    Now: "Сейчас",
    "X-Scale": "Масштаб по X",
    "Y-Scale": "Масштаб по Y",
    "Display task list": "Скрыть список",
    weekdays:
      "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split(
        "_"
      ),
    weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
    weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
    months:
      "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
        "_"
      ),
    monthsShort:
      "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split(
        "_"
      ),
    weekStart: 1,
    formats: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY г.",
      LLL: "D MMMM YYYY г., H:mm",
      LLLL: "dddd, D MMMM YYYY г., H:mm",
    },
    relativeTime: {
      future: "через %s",
      past: "%s назад",
      s: "несколько секунд",
      m: "минута",
      mm: "%d минут",
      h: "час",
      hh: "%d часов",
      d: "день",
      dd: "%d дней",
      M: "месяц",
      MM: "%d месяцев",
      y: "год",
      yy: "%d лет",
    },
  },
};
export default {
  name: "Gantt",
  components: {
    InfoCard,
    GanttElastic,
    GanttHeader,
    Spinner,
  },
  data() {
    return {
      test: "",
      allSevices: [],
      allCoordinators: [],
      left: 0,
      top: 0,
      loading: false,
      currentLocale: "ru-RU",
      tasks: [],
      options,
      dynamicStyle: {},
      priorityColor: null,
      status: null,
      index: null,
      description: null,
      categoryName: null,
      target: null,
      service: null,
      startTime: null,
      startTimeHeader: null,
      endTime: null,
      label: null,
      shortDescription: null,
      owner: {},
      initiator: {},
      type: null,
    };
  },
  computed: {
    getVisibleModal() {
      return this.$store.getters.getVisibleModal;
    },
    getFilters() {
      return this.$store.getters.getFiltersGannt;
    },
    getLocale() {
      return this.$store.getters.getLocale;
    },
    getFilteredTasks() {
      return this.$store.getters.getTasks
        .filter((task) => {
          if (!this.getFilters.shortDesc.shortDescAccurate) {
            return task.shortDescription
              .toLowerCase()
              .includes(this.getFilters.shortDesc.findShortDesc.toLowerCase());
          } else if (this.getFilters.shortDesc.shortDescAccurate) {
            return (
              task.shortDescription.toLowerCase() ===
              this.getFilters.shortDesc.findShortDesc.toLowerCase()
            );
          }
        })
        .filter((task) => {
          if (this.getFilters.service.checkedServices.length !== 0) {
            if (
              this.getFilters.service.serviceValue === "Равно" ||
              this.getFilters.service.serviceValue === "Equals"
            ) {
              if (this.getLocale === "ru-RU") {
                return this.getFilters.service.checkedServices.includes(
                  task.service === "" ? "Не указано" : task.service
                );
              } else {
                return this.getFilters.service.checkedServices.includes(
                  task.service === "" ? "Not indicated" : task.service
                );
              }
            } else {
              if (this.getLocale === "ru-RU") {
                return !this.getFilters.service.checkedServices.includes(
                  task.service === "" ? "Не указано" : task.service
                );
              } else {
                return !this.getFilters.service.checkedServices.includes(
                  task.service === "" ? "Not indicated" : task.service
                );
              }
            }
          } else {
            return task;
          }
        })
        .filter((task) => {
          if (this.getFilters.coordinator.checkedCoordinators.length !== 0) {
            if (
              this.getFilters.coordinator.coordinatorValue === "Равно" ||
              this.getFilters.coordinator.coordinatorValue === "Equals"
            ) {
              if (this.getLocale === "ru-RU") {
                return this.getFilters.coordinator.checkedCoordinators.includes(
                  task.initiatorFullName === ""
                    ? "Не указано"
                    : task.initiatorFullName
                );
              } else {
                return this.getFilters.coordinator.checkedCoordinators.includes(
                  task.initiatorFullName === ""
                    ? "Not indicated"
                    : task.initiatorFullName
                );
              }
            } else {
              if (this.getLocale === "ru-RU") {
                return !this.getFilters.coordinator.checkedCoordinators.includes(
                  task.initiatorFullName === ""
                    ? "Не указано"
                    : task.initiatorFullName
                );
              } else {
                return !this.getFilters.coordinator.checkedCoordinators.includes(
                  task.initiatorFullName === ""
                    ? "Not indicated"
                    : task.initiatorFullName
                );
              }
            }
          } else {
            return task;
          }
        });
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("UPDATE_VISIBLE_MODAL");
    },
    uniqueValuesForFilters(arr) {
      let result = [];
      for (let str of arr) {
        if (!result.includes(str) && str !== "") {
          result.push(str);
        }
      }
      return result;
    },
    // Открытие запроса на изменение и передача данных в основной компонент модального окна
    taskOnClicked({ event, data }) {
      this.left = event.clientX;
      this.top = event.clientY;
      this.index = data.index;
      this.target = data.target;
      this.description = data.description;
      this.priorityColor = data.priorityColor;
      this.label = data.label;
      this.service = data.service;
      this.shortDescription = data.shortDescription;
      this.owner = data.owner;
      this.initiator = data.initiator;
      this.startTimeHeader = dayjs(data.startTime).format("DD.MM.YYYY");
      this.startTime = dayjs(data.startTime).format("DD.MM.YYYY HH:mm");
      this.endTime = dayjs(data.endTime).format("DD.MM.YYYY HH:mm");
      this.type = data.type;
      this.categoryName = data.categoryName;
      this.$store.commit("UPDATE_VISIBLE_MODAL");
    },
    setLocale() {
      // Устанавливливаем локаль, взависимости от данных с серверам
      this.axios
        .get("accountApi/GetAuthenticationInfo")
        .then((response) => {
          const locale = response.data.CultureName;
          this.$store.commit("SET_LOCALE", locale);
          this.currentLocale = locale;
          getLocale = this.currentLocale;
          if (locale === "en-US") {
            this.options.locale = {
              name: "en",
              Now: "Now",
              "X-Scale": "Scale-X",
              "Y-Scale": "Scale-Y",
              "Display task list": "Show task list",
              weekdays:
                "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                  "_"
                ),
              weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
              weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
              months:
                "January_February_March_April_May_June_July_August_September_October_November_December".split(
                  "_"
                ),
              monthsShort:
                "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
              weekStart: 1,
              relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years",
              },
              formats: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMMM YYYY",
                LLL: "D MMMM YYYY HH:mm",
                LLLL: "dddd, D MMMM YYYY HH:mm",
              },
            };
            for (let col of this.options.taskList.columns) {
              this.options.taskList.columns[1].label = "Summary";
              this.options.taskList.columns[2].label =
                "Coordinator / Initiator";
              this.options.taskList.columns[3].label = "Service";
              this.options.taskList.columns[4].label = "Start date of work";
              this.options.taskList.columns[5].label = "Duration";
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllTasks() {
      this.axios
        .get("sdApi/GetRFCGanntList")
        .then((response) => {
          const allTasks = response.data.RFCGannt;
          let allServices = [];
          let allCoordinators = [];
          allTasks.forEach((task) => {
            this.tasks.push(
              new Task(
                task.ID,
                task.FullName,
                task.OwnerName,
                parseInt(
                  task.UtcDateStarted
                    ? task.UtcDateStarted
                    : task.UtcDateDetected
                ),
                parseInt(
                  task.UtcDatePromised -
                    (task.UtcDateStarted
                      ? task.UtcDateStarted
                      : task.UtcDateDetected)
                ),
                task.ClassID
                  ? task.ClassID == 703
                    ? "milestone"
                    : "task"
                  : "task",
                task.ParentID,
                task.FullName,
                task.ClassID,
                task.PriorityName,
                task.PriorityColor,
                0,
                true,
                task.EntityStateName,
                task.Description,
                task.Target,
                task.ServiceName,
                task.Summary,
                [task.ParentID],
                task.Initiator,
                task.Owner,
                task.CategoryName,
                task.Initiator.FullName
              )
            );
            allServices.push(task.ServiceName);
            allCoordinators.push(task.Initiator.FullName);
          });

          this.getLocale === "ru-RU"
            ? allServices.unshift("Не указано")
            : allServices.unshift("Not indicated");

          this.getLocale === "ru-RU"
            ? allCoordinators.unshift("Не указано")
            : allCoordinators.unshift("Not indicated");

          const uniqueServices = this.uniqueValuesForFilters(allServices);
          const uniqueCoordinators =
            this.uniqueValuesForFilters(allCoordinators);

          this.$store.commit("SET_ALL_SERVICES", uniqueServices);
          this.$store.commit("SET_ALL_COORDINATORS", uniqueCoordinators);
          this.$store.commit("SET_ALL_TASKS", this.tasks);

          this.loading = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.setLocale();
    // Загрузка всех запросов на изменение
    this.getAllTasks();
  },
};
</script>

<style lang="scss">
#accurate {
  margin-right: 5px;
}

.gantt-elastic__chart-graph {
  cursor: grab;
}

.services-null {
  margin: 16px 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #333;
}

.hidden-search-icon {
  background-image: none !important;
}

.gantt-elastic__main-container-wrapper {
  overflow: visible !important;
}

.filter {
  &-other {
    width: 255px;
    background: white;
    height: auto !important;
    top: 69px;
  }

  &-line {
    background: #bdd0da;
    margin: 8px 0 22px 0;
  }

  &-list {
    margin: 16px 0;
    max-height: 170px;
    overflow: auto;
    &-helper {
      position: absolute;
      top: 38px;
      width: calc(100% - 20px);
      white-space: normal;
      background: white;
      padding: 10px;
      border: 1px solid #cdcece;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      &__null {
        position: absolute;
        top: 38px;
        width: calc(100% - 20px);
        white-space: normal;
        background: white;
        padding: 10px;
        border: 1px solid #cdcece;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        text-align: center;
        &-text {
          font-size: 12px;
          line-height: 20px;
          color: #333;
        }
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;
    white-space: normal;
    &-wrapper {
      position: relative;
    }
    &:hover {
      background: #f2fafd;
    }

    &-label {
      margin-left: 5px;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #2b2a29;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      & input {
        margin-right: 5px;
      }
    }

    &-field {
      cursor: pointer;
    }
  }
}

.filter-values {
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    & input {
      margin-right: 5px;
      cursor: pointer;
    }

    & label {
      cursor: pointer;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #2b2a29;
    }
  }
}

.gantt-elastic__task-list-header-resizer {
  margin: 0;
  cursor: col-resize;

  &:hover .gannt-elastic__resizer {
    opacity: 1;
  }
}

.gannt-elastic__resizer {
  width: 5px;
  height: 65px;
  opacity: 0;
  background: #a9a9a9;
}

[class^="gantt-elastic"],
[class*=" gantt-elastic"] {
  box-sizing: border-box;
}

.active-filter {
  & svg {
    & path {
      fill: #61d6f2;
    }
  }
}

.gantt-elastic__task-list-header-column {
  position: relative;
  border-left: none;
  border-right: 1px solid rgb(218, 218, 218) !important;
}

.filter {
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #cdcece;
  background: white;
  z-index: 1000;
  position: absolute;
  left: 0;

  &__btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn__second-priority {
      margin-right: auto;
    }
  }

  &__wrapper {
    padding: 20px;
  }

  &-accurate {
    margin: 16px 0;
    display: flex;
    align-items: center;

    & label {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      cursor: pointer;
      color: #2b2a29;
    }
    & input {
      cursor: pointer;
    }
  }

  &-input {
    padding: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    border: none;
    outline: 1px solid #d3d3d3;
    line-height: 14px;
    width: calc(100% - 20px);
    background-image: url("../../assets/icons/table/search.svg");
    background-size: 13px 13px;
    background-repeat: no-repeat;
    background-position: 10px;
    &::placeholder {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #cdcece;
      padding-left: 23px;
    }

    &:focus {
      outline: 2px solid #81aef0;
      background-image: none;
      &::placeholder {
        padding-left: 0;
      }
    }
  }

  &-desc {
    width: 280px;
    height: 155px;
    top: 69px;
  }
}

//
.reverse {
  transform: rotate(180deg);
}

.column-filter {
  margin-left: 12px;
}

.column-sort {
  margin-left: 2px;

  & img {
    width: 16px;
    height: 7px;
  }
}

.gantt-elastic__chart-calendar-container {
  margin-bottom: 0 !important;
}

.gantt-elastic__chart-row-bar {
  cursor: pointer;
}

.gantt-elastic__task-list-header {
  margin-bottom: 0 !important;
}

.tasks-error {
  border: 1px dotted #c1cfd9;
  display: flex;
  justify-content: center;
  width: 100%;

  &__text {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    line-height: 20px;
    color: #333;
    padding-top: 20px;
  }
}

.gantt-elastic__header-title {
  display: none !important;
}

.gantt-elastic__header {
  justify-content: center !important;
}

.gantt-elastic__main-container {
  width: 100%;

  &-wrapper {
    &-visible {
      overflow: visible !important;
    }
  }
}

.gantt-elastic__chart-calendar-container {
  height: 66px !important;
}

.gannt__label-name {
  display: flex;
  overflow: hidden;

  & p {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.gantt-elastic__task-list-header-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  white-space: nowrap !important;
  word-wrap: break-word;
}

.gantt-elastic__task-list-header {
  height: 66px !important;
}

.gantt-elastic__calendar-row-rect-child {
  height: 24px !important;
}

.gantt-elastic__header-label {
  margin-right: 30px !important;
  font-size: 12px;
}

.gantt-elastic__header-btn-recenter {
  background: #43a2e3 !important;
  color: white !important;
  padding: 10px 15px !important;
  font-size: 12px !important;
  line-height: 14px !important;
  border-radius: 2px !important;
  margin-right: 30px !important;
}

.gantt-elastic__header-btn-recenter:hover {
  background: #1480c4 !important;
}

.gantt-elastic__header-slider-wrapper {
  padding-left: 10px;
}

.gantt-elastic__task-list-item-value-container {
  width: 100% !important;
}

.modal-content {
  padding: 24px;
  overflow: auto;
  height: 100%;
  max-height: 500px;
}

.modal__request {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.request__color {
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  margin-right: 9px;
  border: 1px solid #bdd0da;
}

.request__title {
  font-size: 12px;
  color: #000000;
  line-height: 14px;
  font-weight: 400;
}

.modal__title {
  font-weight: 700;
  color: #000000;
  line-height: 19px;
  font-size: 12px;
}

.modal-label {
  line-height: 15px;
  color: #9d9e9e;
  font-weight: 400;
  font-size: 11px;
  padding-top: 10px;
  padding-bottom: 3px;
  margin: 0;
}

.modal__text {
  font-size: 12px;
  color: #000000;
  font-weight: 400;
  line-height: 17px;
}

.modal__time {
  display: flex;
  padding-top: 5px;
}

.modal__time-started {
  padding-right: 40px;
}

.modal-card {
  display: flex;
  padding-top: 20px;
}

.modal-card__picture {
  width: 43px;
  height: 43px;
}

.modal-card__title {
  color: #61d6f2;
  line-height: 14px;
  font-size: 12px;
  padding-bottom: 7px;
}

.modal-card__name {
  font-weight: 700;
  color: #000000;
  line-height: 14px;
  font-size: 12px;
  padding-bottom: 7px;
}

.modal-card__num {
  font-size: 12px;
  font-style: italic;
  color: #000000;
  line-height: 14px;
  padding-bottom: 7px;
}

.modal-card__post {
  font-size: 12px;
  color: #000000;
  line-height: 14px;
  padding-bottom: 7px;
}

.modal-card__place {
  font-size: 11px;
  font-style: italic;
  color: #000000;
  line-height: 13px;
}

.modal-close {
  text-align: center;
  bottom: 0;
  width: 100%;
  background: white;
}

.modal-close__btn {
  margin: 24px auto;
  background: #d0d0d0;
  border-radius: 5px !important;
  outline: none;
  border: none;
  padding: 10px 20px !important;
  cursor: pointer;
  color: white;
  font-weight: 400;
  line-height: 16px !important;
  font-size: 14px !important;
}

.modal-card__contacts-email {
  color: #43a2e3;
  text-decoration: none;
  line-height: 13px;
  font-size: 12px;
  font-style: italic;
}

.modal-card__content {
  padding-left: 11px;
}

.time__date {
  font-size: 12px;
  color: #000000;
  line-height: 14px;
}
</style>
