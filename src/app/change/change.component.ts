import { Component, OnInit } from '@angular/core';
import { CorrespondantService } from '../services/correspondant.service';
import { HttpClient } from '@angular/common/http';
import { IChange } from '../interface/ichange';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
public changes = []
  constructor(private http: HttpClient,private correspondantService : CorrespondantService) { }

  ngOnInit() {
    this.reloadData()
  }
reloadData()
{
  this.http.get<IChange[]>(this.correspondantService.urlChange).subscribe(
    rep => {console.log(rep);this.changes=rep},
    error => {console.log(error)}
  )
}
}
