import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UploadFileService} from './upload-file.service';
import {GATEWAY_URL} from "../../../../_base/service/model/rest-constants";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  fileToUpload: File = null;
  loader = false;
  @Output() uploadFileDomainOut = new EventEmitter<any>();
  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: any): any {
    this.fileToUpload = files;
  }

  uploadFileToActivity(): any {

    this.loader = true;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);

    // وقتی که نیاز به ارسال مدل همزاه با فایل بود استفاده شود
    // formData.append('fileDomain', new Blob([JSON.stringify(fileDomain)],
    //   {type: 'application/json'}));

    this.uploadFileService.postFile(this.fileToUpload).subscribe(data => {
      this.loader = false;
      if (data.flag) {
        this.uploadFileDomainOut.emit(data.data);
      }
    }, error => {
      this.loader = false;
      console.log(error);
    });
  }

  cancelUpload(): void {
    this.loader = false;
    this.fileToUpload = null;
  }
}
