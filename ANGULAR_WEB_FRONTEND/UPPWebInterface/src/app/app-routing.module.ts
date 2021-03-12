import {PlcrecordComponent} from './client/plcrecord/plcrecord.component';
import {SubjectQuestionComponent} from './client/subject-question/subject-question.component';
import {QuizComponent} from './client/quiz/quiz.component';
import {PlacementComponent} from './client/placement/placement.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {IndexComponent} from './client/index/index.component';
import {PostComponent} from './client/post/post.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';
import {ServerErrorComponent} from './server-error/server-error.component';
import {LoginComponent} from './login/login.component';
import {AddPostComponent} from './expert/add-post/add-post.component';
import {AuthGuard} from './guard/auth.guard';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {RegisterComponent} from './register/register.component';
import {ProblemsComponent} from './problems/problems.component';
import {ProblemSolveComponent} from './problem-solve/problem-solve.component';
import {LandingpgComponent} from './client/landingpg/landingpg.component';
import {PredictComponent} from './client/predict/predict.component';
import {AddProblemComponent} from './expert/add-problem/add-problem.component';
import {AddQuestionComponent} from './expert/add-question/add-question.component';
import {PastComponent} from './client/past/past.component';

const routes: Routes = [
  {path: 'index', component: LandingpgComponent},
  {path: 'article', component: IndexComponent},
  {path: 'upp-login', component: LoginComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'placement', component: PlacementComponent},
  {path: 'problems', component: ProblemsComponent},
  {path: 'problems/:id', component: ProblemSolveComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'question/:subject', component: SubjectQuestionComponent},
  {path: 'plcrecord/:record', component: PlcrecordComponent},
  {path: 'past', component: PastComponent},
  {path: 'error', component: PageNotFoundComponent},
  {path: 'terms', component: TermsAndConditionsComponent},
  {path: 'internalerror', component: ServerErrorComponent},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: 'upp-register', component: RegisterComponent},
  {path: 'blog', component: IndexComponent},
  {path: 'predict', component: PredictComponent},
  {path: 'add/post', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'add/problem', component: AddProblemComponent, canActivate: [AuthGuard]},
  {path: 'add/question', component: AddQuestionComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
