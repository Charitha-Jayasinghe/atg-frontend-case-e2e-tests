import { BasePage } from "./basePage";

export class HomePage extends BasePage {

  async getBetTypes(): Promise<string> {
    return await this.page.inputValue('.css-1qewwhh >> nth=0');
  }

  async getSelectedOrderType(): Promise<string> {
    return await this.page.inputValue('.css-1qewwhh >> nth=1');
  }

  async getAllBetTypeOptions(): Promise<string[]> {
    const dropdown = await this.page.getByLabel('Select bet type: V75V86GS75');
    return await dropdown.locator('option').allTextContents();
  }

  async getAllOrderTypeOptions(): Promise<string[]> {
    const dropdown = this.page.locator('.css-1qewwhh >> nth=1');
    return await dropdown.locator('option').allTextContents();
  }

  async selectBetType(betType: string) {
    const dropdown = this.page.locator('.css-1qewwhh >> nth=0');
    await dropdown.selectOption({ label: betType });
  }

  async selectDisplayOrderType(orderType: string) {
    const dropdown = this.page.locator('.css-1qewwhh >> nth=1');
    await dropdown.selectOption({ label: orderType });
  }

  async getAllTrackDetails(): Promise<string[]> {
    await this.page.waitForSelector('.css-19bcwyh');

    const trackNames = await this.page
      .locator("//*[@class='css-19bcwyh']//h1[1]")
      .evaluateAll((elements) =>
        elements.map((el) => el.textContent?.trim() || '')
      );

    if (trackNames.length === 0) {
      throw new Error('No track names found');
    }

    console.log('Extracted Track Names:', trackNames);
    return trackNames;
  }

  async getAllGameSegments(): Promise<{ title: string; details: string[] }[]> {
    const gameSegmentSelector = '.css-1veigam'; 
    const segmentTitleSelector = 'h2'; 
    const segmentDetailsSelector = 'li'; 
  
    const gameSegments = this.page.locator(gameSegmentSelector);
  
    const results: { title: string; details: string[] }[] = [];
  
    const segmentCount = await gameSegments.count();
    for (let i = 0; i < segmentCount; i++) {
      const segment = gameSegments.nth(i);
  
      const title = await segment.locator(segmentTitleSelector).textContent();
  
      const details = await segment.locator(segmentDetailsSelector).allTextContents();
  
      if (title) {
        results.push({
          title: title.trim(),
          details: details.map((detail) => detail.trim()), 
        });
      }
    }
  
    return results;
  }
  
}
