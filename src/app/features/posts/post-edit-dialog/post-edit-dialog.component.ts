import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { postEditData } from '../types/postEditData';
import { IPostEditFormValue } from '../interfaces/IPostEditFormValue';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {
  
  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private fb: FormBuilder = inject(FormBuilder);
  
  editForm!: FormGroup;
  
  ngOnInit(): void {
    const postData: postEditData = this.config.data as postEditData;
    
    this.editForm = this.fb.nonNullable.group({
      title: [postData.title, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      tags: [postData.tags.join(', '), [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      views: [postData.views, [Validators.required, Validators.min(0), Validators.max(9999)]]
    })
  }
  
  onSave(): void {
    if (this.editForm.invalid) {
      return;
    }
    
    const rawValues: IPostEditFormValue = this.editForm.value;
    const formattedTags: string[] = rawValues.tags.split(',').map((tag: string) => tag.trim())
    const postData: postEditData = { ...rawValues, tags: formattedTags };
    
    this.ref.close(postData);
  }
  
  onClose(): void {
    this.ref.close();
  }
  
}
