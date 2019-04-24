 /*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { element, by } from 'protractor';
import { GenericPage } from './common/generic.page';

export class Calendar extends GenericPage {

    readonly datePicker = element(by.css(`.mat-calendar`));
    readonly today = element(by.css(`.mat-calendar-body-today`));

    async isDisplayed() {
        return await super.waitForElementToBeVisible(this.datePicker);
    }

    async isDismissed() {
        return await super.waitForElementToBeInVisible(this.datePicker);
    }

    async setToday() {
        await super.click(this.today);
        await this.isDismissed();
    }
}