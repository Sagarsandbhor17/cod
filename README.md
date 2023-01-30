
# steps to setup the app

- setup the npm environment

```sh
Clone the repo
npm i
```



# Sample Input/Output

# Input:

- CREATE ACC001 KELP

```sh
node src/index.js CREATE ACC001 KELP
```

- DEPOSIT ACC001 10000

```sh
node src/index.js DEPOSIT ACC001 10000
```

- WITHDRAW ACC001 1000

```sh
node src/index.js WITHDRAW ACC001 1000
```

- CREATE ACC002 FVTPL

```sh
node src/index.js CREATE ACC002 FVTPL
```

- DEPOSIT ACC002 10000

```sh
node src/index.js DEPOSIT ACC002 10000
```

- WITHDRAW ACC002 2000

```sh
node src/index.js WITHDRAW ACC002 2000
```

- BALANCE ACC002

```sh
node src/index.js BALANCE ACC002
```

- BALANCE ACC001

```sh
node src/index.js BALANCE ACC001
```

# Output:

- FVTPL 8000
- KELP 9000
