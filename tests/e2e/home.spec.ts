import { test, expect,request } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { getAPIRacingInfo,getGameInfo } from '../utils/InfoAPI';


test('Verify Default Selected Bettype and Display Order', async ({ page }) => {

    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    
    const defaultBetType = await homePage.getBetTypes();
    const defaultOrderType = await homePage.getSelectedOrderType();

    expect(defaultBetType.trim()).toBe('');
    expect(defaultOrderType.trim()).toBe('-1');
   
});

test('Verify All bet types options', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
  
    const betTypes = await homePage.getAllBetTypeOptions();
  
    expect(betTypes).toEqual(['', 'V75', 'V86', 'GS75']);
});

test('Verify All display order options', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');

    const displayOrderTypes = await homePage.getAllOrderTypeOptions();

    expect(displayOrderTypes).toEqual(['Most recent first', 'Oldest first']);
});

test('Verify Bet Type Selection Displays Most Recent Results', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    const apiContext = await request.newContext();

    for (const betType of ['V75', 'V86', 'GS75']) {
        await homePage.selectBetType(betType);
        await homePage.selectDisplayOrderType('Most recent first');
        const response = await getAPIRacingInfo(apiContext, betType)
        const data_products = await response.json();
        

        const displayedBetType = await homePage.getBetTypes();
        const trackNames = await homePage.getAllTrackDetails();
        expect(displayedBetType).toBe(betType), 'Bet Type is not displayed correctly';
        expect(displayedBetType).toBe(data_products.betType), 'Bet Type is is not matching with API response';

          

        for (let i = 0; i < data_products.results.length; i++) {
            const apiTrackName = data_products.results[i].tracks.map(track => track.name).join(' & ');
        
            const matchingUITrack = trackNames.find(uiTrack => {
                const uiTrackName = uiTrack.split(' - ')[0].trim();
                const uiDate = uiTrack.split(' - ')[1].split(',')[0].trim();
                const apiDate = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' }).format(new Date(data_products.results[i].startTime));
        
                return uiTrackName === apiTrackName && uiDate === apiDate;
            });
        
            if (!matchingUITrack) {
                throw new Error(`No matching track found for API track '${apiTrackName}' with date '${data_products.results[i].startTime}'.`);
            }
        
            const stardateAPI = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' }).format(new Date(data_products.results[i].startTime));
            const startimeAPI = new Date(data_products.results[i].startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hourCycle: 'h12',
            });
        
            const stardatetUI = matchingUITrack.split(' - ')[1].split(',')[0].trim();
            const startimeUI = matchingUITrack.split(' - ')[1].split(',')[1].trim();
            const uiTrackName = matchingUITrack.split(' - ')[0].trim(); 
        
            expect(uiTrackName).toBe(apiTrackName); 
            expect(stardatetUI).toBe(stardateAPI);
            expect(startimeUI).toBe(startimeAPI);
        

            
        }
        
        
        for (let i = 0; i < data_products.results.length; i++) { 
            const results_id = data_products.results[i].id;

            const dresponse = await getGameInfo(apiContext, results_id);
            const data_games = await dresponse.json();
            console.log(JSON.stringify(data_games, null, 2));
            const gameSegments = await homePage.getAllGameSegments();
            console.log(gameSegments);

            expect(data_games.id).toBe(results_id);

             // Map API response to an object model and continue with the assertions

            

        }
        
    }
});



test('Verify Bet Type Selection Displays Oldest first Results', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    const apiContext = await request.newContext();

    for (const betType of ['V75', 'V86', 'GS75']) {
        await homePage.selectBetType(betType);
        await homePage.selectDisplayOrderType('Oldest first');

        const response = await getAPIRacingInfo(apiContext, betType)
        const data_products = await response.json();
        

        const displayedBetType = await homePage.getBetTypes();
        const trackNames = await homePage.getAllTrackDetails();
        expect(displayedBetType).toBe(betType), 'Bet Type is not displayed correctly';
        expect(displayedBetType).toBe(data_products.betType), 'Bet Type is is not matching with API response';

          

        for (let i = 0; i < data_products.results.length; i++) {
            const apiTrackName = data_products.results[i].tracks.map(track => track.name).join(' & ');
        
            const matchingUITrack = trackNames.find(uiTrack => {
                const uiTrackName = uiTrack.split(' - ')[0].trim();
                const uiDate = uiTrack.split(' - ')[1].split(',')[0].trim();
                const apiDate = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' }).format(new Date(data_products.results[i].startTime));
        
                return uiTrackName === apiTrackName && uiDate === apiDate;
            });
        
            if (!matchingUITrack) {
                throw new Error(`No matching track found for API track '${apiTrackName}' with date '${data_products.results[i].startTime}'.`);
            }
        
            const stardateAPI = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' }).format(new Date(data_products.results[i].startTime));
            const startimeAPI = new Date(data_products.results[i].startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hourCycle: 'h12',
            });
        
            const stardatetUI = matchingUITrack.split(' - ')[1].split(',')[0].trim();
            const startimeUI = matchingUITrack.split(' - ')[1].split(',')[1].trim();
            const uiTrackName = matchingUITrack.split(' - ')[0].trim(); 
        
            expect(uiTrackName).toBe(apiTrackName); 
            expect(stardatetUI).toBe(stardateAPI);
            expect(startimeUI).toBe(startimeAPI);
        

            
        }
        
        
        for (let i = 0; i < data_products.results.length; i++) { 
            const results_id = data_products.results[i].id;

            const dresponse = await getGameInfo(apiContext, results_id);
            const data_games = await dresponse.json();
            console.log(JSON.stringify(data_games, null, 2));
            const gameSegments = await homePage.getAllGameSegments();
            console.log(gameSegments);

            expect(data_games.id).toBe(results_id);

             // Map API response to an object model and continue with the assertions with ui

            

        }
        
    }
});









