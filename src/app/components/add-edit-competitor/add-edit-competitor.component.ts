import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Competitor } from 'src/app/models/competitor';
import { DataCacheService } from 'src/app/services/data-cache.service';

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
    this.dataService.addCompetitor(this.competitor).subscribe(newCompetitor => {
      this.newCompetitor.emit(newCompetitor);
      this.dialogRef.close();
    })} else {
      this.dataService.updateCompetitor(this.competitor).subscribe(updatedCompetitor => {
        this.updatedCompetitor.emit(updatedCompetitor);
        this.dialogRef.close();
      })
    }
  }

  onCancelClick() {
    this.cancel.emit();
    this.dialogRef.close();
  }

}
