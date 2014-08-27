/*
 * An implementation of the Martello and Toth Heuristic Method
 * to solve the multiple knapsack problem
 *
 *  By Daniel Schmidt, Copyright 2014
 *
 *  Source: http://www.or.deis.unibo.it/kp/Chapter6.pdf
 */

/*
 * n is the number of items 
 * p is profit per item 
 * w is the 'weight' or cost of each item
 * y is an array of current assignments for each item (-1, otherwise the index)
 * z is the current running profit total
 * i is the current "knapsack"
 * c_i is the capacity of the current knapsack
 *
 * Returns an initial greedy allocation of 
 */
function greedy(n, p, w, y, z, i, c_i) {
    for (var j=0; j<n; j++) {
        if (y[j] == -1 && w[j] <= c_i) {
            y[j] = i;
            c_i = c_i - w[j];
            z += p[j];
        }
    }
    return z;
}

function mthm(n, m, p, w, c) {
    var z = 0;
    var y = new Array();

    for (var i=0; i<n; i++) {
        y.push(-1);
    }

    // Set the initial greedy distribution
    var c_hat = c.slice(0);
    for (var i=0; i<m; i++) {
       z = greedy(n, p, w, y, z, i, c_hat[i]); 
    }

    // Rearrange
    z = 0;
    c_hat = c.slice(0)
    var i = 0;
    for (var j=n-1; j>=0; j--) {
        if (y[j] >= 0) {
            var search_array = range(i, m).concat(range(0, i-1));
            var l = -1;
            for (var x=0; x<m; x++) {
                if (w[j] <= c_hat[x]) {
                    l = x;
                }
            }
            if (l < 0) {
                y[j] = 0;
            }
            else {
                y[j] = l;
                c_hat[l] = c_hat[l] - w[j]; 
                z = z + p[j];
                if (l == m-1) {
                    i = 0;
                }
                else {
                    i = l + 1;
                }
            }
        }
    }
    // Greedy fill again after rearranging
    for (var i=0; i<m; i++) {
       z = greedy(n, p, w, y, z, i, c_hat[i]);
    }

    return [z, y];
}

/*
 * A simple range helper function, returns
 * the range i ... m including i and excluding on m
 */
function range(i, m) {
    var a = Array();
    for (var j=i; j<m; j++) {
        a += j;
    }
    return a;
}

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
