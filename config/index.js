import base from './config';
import developer from './developer';

// base configuration values can be overridden by the developer config
export default developer(base);