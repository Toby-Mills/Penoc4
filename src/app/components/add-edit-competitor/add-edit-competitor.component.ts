import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Competitor } from 'src/app/models/competitor';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ToastMessageType } from '../toaster/toaster.component';

@Component({
  selector: 'app-add-edit-competitor',
  templateUrl: './add-edit-competitor.component.html',
  styleUrls: ['./add-edit-competitor.component.css']
})
export class AddEditCompetitorComponent {
  public competitor: Competitor = new Competitor();
  @Input() competitorToEditId: number | undefined;
  @Output() newCompetitor: EventEmitter<Competitor> = new EventEmitter();
  @Output() updatedCompetitor: EventEmitter<Competitor> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  public addingNew: Boolean = false;

  public constructor(
    @Inject(DIALOG_DATA) public data: { competitorToEditId: number | undefined },
    public dataService: DataCacheService,
    public dialogRef: DialogRef,
    public toasterService: ToasterService
  ) { }

  ngOnInit() {
    if (this.data?.competitorToEditId) {
      this.competitorToEditId = this.data.competitorToEditId
    }
    if (this.competitorToEditId) {
      this.dataService.getCompetitor(this.competitorToEditId).subscribe(competitor => {
        let competitorClone  = {...competitor};
        this.competitor = competitorClone;
      })
      this.addingNew = false;
    } else {
      this.addingNew = true;
    }
  }

  onSaveClick() {
    if(this.addingNew){
    this.dataService.addCompetitor(this.competitor).subscribe(
      newCompetitor => {
      this.newCompetitor.emit(newCompetitor);
      this.dialogRef.close();
    },
    error => this.toasterService.showToast('Failed to Add Competitor', ToastMessageType.Failure, 0)
  )} else {
      this.dataService.updateCompetitor(this.competitor).subscribe(
        updatedCompetitor => {
        this.updatedCompetitor.emit(updatedCompetitor);
        this.dialogRef.close();
      },
      error => this.toasterService.showToast('Failed to Save Competitor', ToastMessageType.Failure, 0)
    )
    }
  }

  onCancelClick() {
    this.cancel.emit();
    this.dialogRef.close();
  }

}
