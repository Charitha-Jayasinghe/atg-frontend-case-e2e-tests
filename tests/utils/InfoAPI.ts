import { APIRequestContext } from '@playwright/test';
import Config from './config';

export async function getAPIRacingInfo(
  apiContext: APIRequestContext,
  parameter: string
): Promise<any> {
  
  const endpoint = `${Config.apiBaseURL}/products/${parameter}`;
  const response = await apiContext.get(endpoint);

  return response 
}

export async function getGameInfo(
  apiContext: APIRequestContext,
 
  parameter: string
): Promise<any> {
  
  const endpoint = `${Config.apiBaseURL}/games/${parameter}`;
  const response = await apiContext.get(endpoint);

  return response 
}