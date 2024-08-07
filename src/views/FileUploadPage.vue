<template>

    <div class="container mt-5">

        <div>
            <img class="img-fluid" src="image/熊熊爬樹.jpg">
        </div>
        <div class="row mt-4">
            <div class="col-2 h3">請上傳資料</div>
            <!-- 使用 input-group 將 input 和 button 組成群組 -->
            <div class="col-10 input-group">
                <input class="form-control" type="file" @change="handleFileChange" />
                <button class="btn btn-primary" @click="uploadImage">Upload</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axiosInstance from '@/axios.js';


    export default {
        data() {
            return {
                selectedFile: null,
                uploadedFileName: ''
            }
        },

        // 這邊記得加入 methods 才能正常運作
        methods: {
            handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },

        async uploadImage() {
            if(!this.selectedFile) {
            alert("請選擇檔案!");
            return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);

            try{
            const response =  await axiosInstance.post('https://localhost:7243/api/Upload', formData, {
                headers: {
                'Context-type': 'multipart/form-data',
                },
            });
            this.uploadedFileName = response.data.filePath.split('\\').pop();
            alert("上傳檔案成功~");
            } catch(error) {
            console.error('Error uploading file', error);
            alert('檔案上傳失敗');
            }
        },
        }
    }
</script>