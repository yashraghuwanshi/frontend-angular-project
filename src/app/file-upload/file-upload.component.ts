import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  uploadForm!: FormGroup
  fileData!: File

  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.uploadForm = this.createFormGroup()
  }

  ngOnInit(): void {
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      email: [''],
      username: [''],
      password: ['']
    })
  }

  onFileSelected(event: Event) {
    this.fileData = (event.target as HTMLInputElement).files![0];
  }

  onUpload() {

    const formData = new FormData()
    formData.append("file", this.fileData)

    // Append form values to formData
    formData.append("email", this.uploadForm.get('email')!.value);
    formData.append("username", this.uploadForm.get('username')!.value);
    formData.append("password", this.uploadForm.get('password')!.value);

     // Send formData to service for upload
     this.commonService.uploadFile(formData).subscribe(
      response => {
        console.log('File uploaded successfully', response);
        // Reset form or display success message
       })
   
  }
}
