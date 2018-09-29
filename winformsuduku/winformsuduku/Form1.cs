using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;
namespace Timer
{
    class Program
    {
        static void Main(string[] args)
        {
            Stopwatch st = new Stopwatch();
            st.Start();
            long i = 600000000L;
            Console.WriteLine("Thoi gian thuc hien {0} vong lap rong:", i);
            while (i > 0)
             –i;
            st.Stop();
            Console.WriteLine("{0} giay", st.Elapsed.ToString());
            if (Stopwatch.IsHighResolution)
                Console.WriteLine("Timed with Hi res");
            else
                Console.WriteLine("Not Timed with Hi res");
            Console.ReadKey();
        }
    }
}