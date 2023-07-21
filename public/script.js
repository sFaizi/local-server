const data = fetch('127.0.0.1:8080/data');

try {
  console.log(data);
} catch (err) {
  console.log('error', err);
}
