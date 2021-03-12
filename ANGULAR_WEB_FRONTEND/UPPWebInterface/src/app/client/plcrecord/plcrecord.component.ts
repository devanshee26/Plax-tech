import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PlacementService} from '../../services/placement.service';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Iplacement} from '../../models/iplacement';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-plcrecord',
  templateUrl: './plcrecord.component.html',
  styleUrls: ['./plcrecord.component.css']
})
export class PlcrecordComponent implements AfterViewInit {
  public record: string;
  public status: boolean;
  public displayedColumns: string[] = ['Title', 'Company Name', 'Location', 'History', 'URL', 'Ratings', 'Reviews', 'Experience', 'Salary', 'Qualification'];
  public dataSource: any;
  @ViewChild(MatPaginator)
  // @ts-ignore
  public paginator: MatPaginator;
  public data: Iplacement[];


  constructor(private placementService: PlacementService,
              private activatedRoute: ActivatedRoute) {
    this.record = this.activatedRoute.snapshot.params.record;
    this.status = true;
    this.data = [];
  }

  ngAfterViewInit(): void {
    this.placementService.get(this.record).subscribe((value => {
      this.data = value;
      console.log(this.data);
      this.dataSource = new MatTableDataSource<Iplacement>(this.data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.status = false;
    }));
  }
}
