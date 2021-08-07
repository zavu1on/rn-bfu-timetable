import abitsTimetable from './store/abitsTimetable'
import teachers from './store/teachers'
import subjects from './store/subjects'
import favorite from './store/favorite'
import history from './store/history'
import teachingLevel from './store/teachingLevel'
import { favoriteDB } from './favoriteDB'
import { historyDB } from './historyDB'

function parseTimetable(data) {
  for (const institute of Object.entries(data)) {
    for (const tl of Object.entries(institute[1])) {
      for (const group of Object.entries(tl[1])) {
        for (const el of group[1]) {
          el.startTime = new Date(0, 0, 0, ...el.startTime.split(':').map(el => Number(el)))
          el.endTime = new Date(0, 0, 0, ...el.endTime.split(':').map(el => Number(el)))
          el.date = new Date(el.date)
        }
      }
    }
  }

  return data
}


export const bootstrap = async () => {
  // let resp = await fetch('/static/timetable.json')
  // let data = await resp.json()
  // abitsTimetable.setData(parseTimetable(data))
  //
  // resp = await fetch('/static/teachers.json')
  // data = await resp.json()
  // teachers.setData(data)
  //
  // resp = await fetch('/static/subjects.json')
  // data = await resp.json()
  // subjects.setData(data)
  //
  // resp = await fetch('/static/tl.json')
  // data = await resp.json()
  // teachingLevel.setData(data)

  abitsTimetable.setData({
    'Институт природопользования, территориального развития и градостроительства':
      {
        Специалитет: {
          111222: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'Лекционнное занятие',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Роман Иванович Романов',
              place: 'Аудитория 312',
              date: new Date(2021, 5, 30),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'Лекционнное занятие',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Роман Иванович Романов',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'Лекционнное занятие',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
          222111: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'Лекционнное занятие',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
        },
      },
    'Медицинский институт': {
      Специалитет: {
        333444: [
          {
            title: 'Теория вероятностей и математическая статистика',
            type: 'Лекционнное занятие',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 1000000),
            teacher: 'Иванов Иван Инванович',
            place: 'Аудитория 312',
            date: new Date(2021, 5, 29),
          },
          {
            title: 'Теория вероятностей и математическая статистика',
            type: 'Лекционнное занятие',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 1000000),
            teacher: 'Иванов Иван Инванович',
            place: 'Аудитория 312',
            date: new Date(Date.now()),
          },
        ],
        4443333: [
          {
            title: 'Теория вероятностей и математическая статистика',
            type: 'Лекционнное занятие',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 1000000),
            teacher: 'Роман Иванович Романов',
            place: 'Аудитория 312',
            date: new Date(Date.now()),
          },
        ],
      },
    },
  })
  teachers.setData([
    {
      teacher: 'Иванов Иван Инванович',
      institut: 'Медицинский институт',
    },
    {
      teacher: 'Роман Иванович Романов',
      institut:
        'Институт природопользования, территориального развития и градостроительства',
    },
  ])
  subjects.setData({
    'Институт природопользования, территориального развития и градостроительства':
      [{ title: 'Теория вероятностей и математическая статистика' }],
    'Медицинский институт': [
      { title: 'Теория вероятностей и математическая статистика' },
    ],
  })
  teachingLevel.setData(['Специалитет', 'Бакалавриат'])

  await favoriteDB.init()
  await historyDB.init()
  const favorites = await favoriteDB.getFavorite()
  const histories = await historyDB.getHistory()
  favorite.setData(favorites)
  history.setData(histories)
}
