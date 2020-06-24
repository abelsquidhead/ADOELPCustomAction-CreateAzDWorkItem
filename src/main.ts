import * as core from '@actions/core'
import * as github from '@actions/github'
import * as azdev from "azure-devops-node-api";
import * as witapi from "azure-devops-node-api/WorkItemTrackingApi";
import * as witi from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import {wait} from './wait'
import { JsonPatchDocument } from 'azure-devops-node-api/interfaces/common/VSSInterfaces';

async function run(): Promise<void> {
  try {

    // get input values
    const myInput: string = core.getInput('myInput');
    const myToken = core.getInput('myToken');
    core.debug(`Hello ${myInput}  ...`);
    console.log("myInput: " + myInput);
    console.log("myToken: " + myToken);

    // get reference to octokit
    const octokit = github.getOctokit(myToken);

    // get reference to current context and get info about pull request
    const context = github.context;
    const prUrl = context.payload.pull_request?.html_url;
    const prBody = context.payload.pull_request?.body;
    const prNumber: number = <number>context.payload.pull_request?.number;
    const { data: pullRequest } = await octokit.pulls.get( {
      owner: 'abelsquidhead',
      repo: 'TailwindsTraders-Website',
      pull_number: prNumber,
 
    });
    const title = pullRequest.title

    // print out the info from PR
    console.log("prUrl: " + prUrl);
    console.log("prBody: " + prBody);
    console.log("title: " + title);


    // connect to AzD
    let orgUrl = "https://dev.azure.com/AzureDevOpsDemo-a";
    let token:  string = "ppbs6zhmq5xtupvumfvxcx4qjbh7dxkro72tew5ia6na53lhmppq";
    let authHandler = azdev.getPersonalAccessTokenHandler(token); 
    let connection = new azdev.WebApi(orgUrl, authHandler); 
    console.log("got connection:" + connection);

    // get work item tracking for projemct ADOELPDemo
    let wit: witapi.IWorkItemTrackingApi = await connection.getWorkItemTrackingApi()
    console.log("got wit:" + wit);


    let project: string = "ADOELPDemo";
    let workitemType: string = "PR"
    let createWorkItemJson: JsonPatchDocument = [
      {
        "op": "add",
        "path": "/fields/System.Title", 
        "from": null, 
        "value": title 
      },
      {
        "op": "add",
        "path": "/fields/System.IterationPath", 
        "from": null, 
        "value": "ADOELPDemo\\Sprint 1"
      },
      {
        "op": "add",
        "path": "/fields/System.State", 
        "from": null, 
        "value": "Approved"
      },
      {
        "op": "add",
        "path": "/fields/WEF_55FBA321D976426486844EECE72D33D4_Kanban.Lane", 
        "from": null, 
        "value": "PR"
      },
      {
        "op": "add",
        "path": "/relations/-",
        "from": null,
        "value": {
            "rel": "ArtifactLink",
             "url": prUrl,
             "attributes": {
              "name": "GitHub Pull Request",
              "comment": "333"
            }
        }
      }
    ];
    console.log('trying to create work item');
    wit.createWorkItem({}, createWorkItemJson, project, workitemType, false, true, false, witi.WorkItemExpand.None )
    console.log('created work item');

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
