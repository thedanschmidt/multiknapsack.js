function run() {
    // A test case to demonstrate
    
    var n = 9;
    var m = 2;
    // p and w must be sorted by p[0]/w[0] <= p[1]/w[1] <= ... p[n]/w[n]
    var p = [80, 20, 60, 40, 60, 60, 65, 25, 30]; 
    var w = [40, 10, 40, 30, 50, 50, 55, 25, 40]; 
    var c = [100, 150];
    var return_vals = mthm(n, m, p, w, c);
    z = return_vals[0];
    y = return_vals[1];
    console.log(z);
    console.log(y);
}

run();
