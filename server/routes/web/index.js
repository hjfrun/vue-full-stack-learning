const Article = require('../../models/Article')

module.exports = app => {
  const router = require('express').Router()

  // const Article = require('../../models/Article')
  const mongoose = require('mongoose')
  // const Article = mongoose.model('Article')
  // const Category = mongoose.model('Category')
  const Category = require('../../models/Category')
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parent
    }).lean()
    const newsTitles = ["曲韵芳华丨经典咏流传 《数字化破局》新文创微纪录片首期全网上线", "王者破浪之战暑期狂欢，专属豪礼送上！", "2020QQ名人赛《王者荣耀》第二期开赛，蓝盈莹、曾可妮携手带来峡谷首秀", "腾讯微视王者嘉年华来袭，6位姐姐变身峡谷女英雄陪你开“浪”", "《天天爱消除》七周年庆欢乐开启，樱桃小丸子治愈来袭！", "8月6日体验服停机更新公告", "8月6日全服不停机优化公告", "8月6日iOS用户启动游戏异常说明公告", "8月5日体验服违规处罚公告", "8月5日净化游戏环境声明及处罚公告", "夏日盛典开启，新英雄阿古朵登场！送皮肤、抽内测惊喜好礼享不停", "【三分探险】活动开启公告", "夏日有好礼，峡谷乐不停", "【微信用户专属】张飞新皮肤上线抽免单活动", "张飞-虎魄五虎上将限定皮肤即将上架，参与活动领好礼", "8月7日【比赛服】版本更新公告", "7月29日【比赛服】版本更新公告", "7月13日【比赛服】版本更新公告", "2020年王者荣耀世界冠军杯小组赛赛程出炉", "2020年王者荣耀世界冠军杯第二轮选拔赛 加赛及抽签规则"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        title,
        categories: randomCats.slice(0, 2)
      }
    })
    // await Article.deleteMany({})
    // await Article.insertMany(newsList)
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })

    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $addFields: {
          'newsList': { $slice: ['$newsList', 5] }
        }
      }
    ])

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })

    res.send(cats)
  })

  app.use('/web/api', router)
}