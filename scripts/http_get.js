import http from 'k6/http';
import { sleep, check } from "k6";
import { Rate } from "k6/metrics";

// Define default options 
export let options = {
  noConnectionReuse: true,
  discardResponseBodies: true,
  userAgent: "K6Testing",
  rps: 2,
  stages: [
    { duration: "10s", target: 3 },
  ],
  thresholds: {
    'RTT': ['p(99)<30', 'p(70)<25', 'avg<20', 'med<15', 'min<10'],
    'Content OK': ['rate>0.95'],
    'ContentSize': ['value<4000'],
    'Errors': ['count<0.1'],
  }
};
  
// Store our errors
let errorRate = new Rate("errors");

// A file containing a json-list of paths (excluding domain)
const urls = JSON.parse(open("/scripts/url-paths.json"));

export default function() {
  // Pick a url from the json list
  var url = urls[__ITER % urls.length];
  console.log(url)
  if (!url)
    return

  // Get the result (take the hostname from env and combine with url)
  var res = http.get(`https://kernel.org/${url}`); 
	
  // Ensure all urls result in a 200 and return in required time
  var passed = check(res, {
        "is status 200": (r) => r.status === 200,
        "transaction time OK(All under 1s)": (r) => r.timings.duration < 1000
    });
    if (!passed) {
        errorRate.add(1);
    }

    sleep(1)
    
};
