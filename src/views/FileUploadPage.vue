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

        <div class="row mt-4">
            <div class="col-6 h3">請上傳資料 (轉為 Base64)</div>
            <!-- 使用 input-group 將 input 和 button 組成群組 -->
            <div class="col-10 input-group">
                <input class="form-control" type="file" @change="handleFileChange" />
                <button class="btn btn-primary" @click="handleFileUpload">Upload</button>
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

        // 處理上傳 Base64 的檔案
        handleFileUpload() {
            // const file = event.target.files[0];
            if (!this.selectedFile) {
                alert('Please select a file first.');
                return;
            }
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64String = e.target.result.split(',')[1]; // 只取 base64 的部分
                this.uploadFile(base64String);
            };

            reader.readAsDataURL(this.selectedFile); // 讀取檔案為 Data URL
        },

        uploadFile(base64String) {
            // 假設你有一個上傳檔案的 API
            axiosInstance.post('https://localhost:7243/api/Upload/UploadFileBase64', {
                fileName: this.selectedFile.name,
                contentType: 'NONO',
                fileDate: base64String,
            })
            .then(response => {
                // 處理成功回應
                console.log('File uploaded successfully', response);
                this.uploadedFileName = this.selectedFile.name;
            })
            .catch(error => {
                // 處理錯誤
                console.error('Error uploading file', error);
            });
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