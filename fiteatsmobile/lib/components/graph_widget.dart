import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class EarningsGraph extends StatelessWidget {
  final Color graphColor;

  const EarningsGraph({Key? key, required this.graphColor}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        titlesData: FlTitlesData(
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 22,
              getTitlesWidget: (value, meta) {
                const style = TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                );
                Widget text;
                switch (value.toInt()) {
                  case 1:
                    text = const Text('Jan', style: style);
                    break;
                  case 3:
                    text = const Text('Mar', style: style);
                    break;
                  case 5:
                    text = const Text('May', style: style);
                    break;
                  case 7:
                    text = const Text('Jul', style: style);
                    break;
                  case 9:
                    text = const Text('Sep', style: style);
                    break;
                  case 11:
                    text = const Text('Nov', style: style);
                    break;
                  default:
                    text = const Text('');
                }
                return SideTitleWidget(
                  axisSide: meta.axisSide,
                  space: 10,
                  child: text,
                );
              },
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                const style = TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                );
                return Text('${value.toInt()}', style: style);
              },
            ),
          ),
        ),
        borderData: FlBorderData(
          show: true,
          border: Border.all(color: const Color(0xff37434d), width: 1),
        ),
        lineBarsData: [
          LineChartBarData(
            spots: const [
              FlSpot(1, 3),
              FlSpot(2, 2),
              FlSpot(3, 5),
              FlSpot(4, 3.1),
              FlSpot(5, 4),
              FlSpot(6, 3.5),
              FlSpot(7, 4),
            ],
            isCurved: true,
            color: graphColor,
            barWidth: 3,
            belowBarData: BarAreaData(show: false),
          ),
        ],
      ),
    );
  }
}
