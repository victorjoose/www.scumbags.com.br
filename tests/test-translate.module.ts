import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateFakeLoader } from '@ngx-translate/core';

@NgModule({
  exports: [TranslateModule],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader,
      },
    }),
  ],
})
export class TestTranslateModule {}
