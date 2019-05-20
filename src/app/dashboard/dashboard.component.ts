import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  viewProviders: [DragulaService]

})
export class DashboardComponent implements OnInit {

  public projectsResponse = {}
  public projectsGL: Project[]
  public projectsSL: Project[]
  public projectsGLToShow: Project[]
  public projectsSLToShow: Project[]
  public selectedBobId: String;
  public selectedEnv: string;
  public selectedIndex: number;
  public bothDc = false;
  public currentDc = 'GL';

  constructor(private _projectService: ProjectService) {
    this._projectService.getProjects().subscribe(data => {
      this.projectsResponse = data;
      this.initializeProjects();
    });

  }

  ngOnInit() {

  }

  onKey(event: any) {
    const searchParam = event.target.value.toLowerCase();
    if (searchParam === "" || searchParam === null) {
      for (let i = 0; i < this.projectsGL.length; i++) {
        this.projectsGLToShow[i].hidden = false;
      }
    }
    else {
      for (let i = 0; i < this.projectsGL.length; i++) {
        if (this.projectsGLToShow[i].bob_id.toLowerCase().search(searchParam) == -1 &&
          this.projectsGLToShow[i].env.toLowerCase().search(searchParam) == -1 &&
          this.projectsGLToShow[i].name.toLowerCase().search(searchParam) == -1
        ) {
          this.projectsGLToShow[i].hidden = true;
        }
        else {
          this.projectsGLToShow[i].hidden = false;
        }
      }
    }
  };



  initializeProjects() {
    this.projectsGL = this.getProjectsOfDC("GL");
    this.projectsGLToShow = this.getProjectsOfDC("GL");
    this.projectsSL = this.getProjectsOfDC("SL");
  }
  getProjectsOfDC(datacentre: string) {
    const projects: Project[] = [];
    for (const bob_id of Object.keys(this.projectsResponse[datacentre])) {
      const bob_id_data = this.projectsResponse[datacentre][bob_id]
      const project: Project = {
        "bob_id": "",
        "name": "",
        "pod": "",
        "version": "",
        "v_env": "",
        "env": "",
        "appd": "",
        "wily": "",
        "elk": "",
        "last_updated": "",
        "hidden": false,
        "running": null
      };
      project["bob_id"] = bob_id;
      for (const key of Object.keys(bob_id_data)) {
        const value = bob_id_data[key];
        project[key] = value;
      }
      projects.push(project);
    }
    return projects;
  }

  remove(i: number) {
    this.projectsGLToShow[i].hidden = true;
  }

  showRunning(event) {
    var target = event.target;
    if (target.checked) {
      for (let i = 0; i < this.projectsGLToShow.length; i++) {
        if (this.projectsGLToShow[i].running) {
          this.projectsGLToShow[i].hidden = false;
        }
        else
          this.projectsGLToShow[i].hidden = true;
      }
    }
  }

  showDown(event) {
    var target = event.target;
    if (target.checked) {
      for (let i = 0; i < this.projectsGLToShow.length; i++) {
        if (this.projectsGLToShow[i].running)
          this.projectsGLToShow[i].hidden = true;
        else {
          this.projectsGLToShow[i].hidden = false;
        }
      }
    }
  }

  showAll(event) {
    var target = event.target;
    if (target.checked) {
      for (let i = 0; i < this.projectsGLToShow.length; i++) {
        this.projectsGLToShow[i].hidden = false;
      }
    }
  }

  selectedProject(i) {
    this.selectedBobId = this.projectsGLToShow[i].bob_id;
    this.selectedIndex = i;
  }

  postEnv() {
    console.log(this.selectedEnv);
    let response: Object;
    this._projectService.postEnvIdentifier(this.selectedBobId, this.selectedEnv).subscribe(data => {
      response = data;
      console.log(data)
      this.projectsGLToShow[this.selectedIndex].env = data['env'];
    });
  }
}