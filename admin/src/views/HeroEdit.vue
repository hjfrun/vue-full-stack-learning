<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      model: {
        name: '',
        icon: ''
      }
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    afterUpload(res) {
      console.log('res: ', res)
      this.model.icon = res.url
    },
    async fetch() {
      const { data } = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = data
      console.log('data', data)
    },
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/heroes', this.model)
      }
      console.log('res', res)
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>