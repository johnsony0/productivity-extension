//@ts-ignore
import * as ort from 'onnxruntime-web';
import { AutoTokenizer, env } from '@xenova/transformers';

env.allowLocalModels = false;

type CheckTextResult = string | null;
type RunModelResult = Uint8Array<ArrayBufferLike> | any;
type ConvertTextToVectorResult = number[] | null;

export const initModel = () => {
  ort.env.wasm.wasmPaths = chrome.runtime.getURL('');
};

export const checkText = (text: string): CheckTextResult => {
  if (text.trim().length === 0) {
    return 'Length of text is too short';
  }
  const lowerText = text.toLowerCase();
  const isPolitical = keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));

  if (!isPolitical) {
    return 'Post not political: skip scan';
  }

  return null;
};

export const runModel = async (text: string): Promise<RunModelResult> => {
  const MODEL_PATH = chrome.runtime.getURL('classification_model.onnx');
  const vectorized_text = await convertTextToVector(text);
  if (vectorized_text === null) {
    return Array(100).fill(0);
  }
  try {
    const session = await ort.InferenceSession.create(MODEL_PATH);
    console.log('gets past session');
    const data = new Int32Array(vectorized_text);
    const tensor_data = new ort.Tensor('int32', data, [1, data.length]);
    const feeds = { input: tensor_data };
    const results = await session.run(feeds);
    return results.output.data;
  } catch (error) {
    console.error('Error creating inference session or running the model:', error);
    return Array(100).fill(0);
  }
};

export const convertTextToVector = async (text: string): Promise<ConvertTextToVectorResult> => {
  text = text.replace(/https?:\/\/\S+/g, '');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/[^a-zA-Z]/g, ' ');
  text = text.replace(/\s+[a-zA-Z]\s+/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  try {
    const tokenizer = await AutoTokenizer.from_pretrained('Xenova/bert-base-uncased');
    const encodedInput = tokenizer.encode(text);
    return encodedInput;
  } catch (error) {
    console.error('Error loading tokenizer:', error);
    return null;
  }
};

const keywords = [
  'election',
  'vote',
  'voting',
  'candidate',
  'campaign',
  'politician',
  'politics',
  'government',
  'congress',
  'senate',
  'house of representatives',
  'white house',
  'president',
  'vice president',
  'democrat',
  'republican',
  'liberal',
  'conservative',
  'policy',
  'legislation',
  'bill',
  'law',
  'executive order',
  'constitution',
  'supreme court',
  'judiciary',
  'governor',
  'mayor',
  'local government',
  'senator',
  'representative',
  'parliament',
  'prime minister',
  'ambassador',
  'diplomacy',
  'foreign policy',
  'domestic policy',
  'budget',
  'taxes',
  'taxation',
  'healthcare',
  'immigration',
  'border',
  'national security',
  'military',
  'war',
  'conflict',
  'peace',
  'international relations',
  'trade',
  'sanctions',
  'lobbying',
  'political party',
  'activism',
  'protest',
  'movement',
  'rights',
  'freedom',
  'civil rights',
  'human rights',
  'reform',
  'corruption',
  'scandal',
  'ethics',
  'voter suppression',
  'gerrymandering',
  'climate change',
  'environmental policy',
  'energy policy',
  'education policy',
  'economic policy',
  'labor',
  'wages',
  'social security',
  'medicare',
  'medicaid',
  'welfare',
  'public assistance',
  'subsidy',
  'entitlement',
  'budget deficit',
  'debt ceiling',
  'public debt',
  'federal reserve',
  'central bank',
  'inflation',
  'unemployment',
  'job creation',
  'economic growth',
  'GDP',
  'trade deficit',
  'export',
  'import',
  'tariff',
  'free trade',
  'fair trade',
  'monetary policy',
  'fiscal policy',
  'regulation',
  'deregulation',
  'privatization',
  'nationalization',
  'kamala',
  'trump',
  'vance',
  'walz',
  'democrats',
  'republicans',
  'voter',
  'voters',
  'election',
  'presidential',
  'president',
];
