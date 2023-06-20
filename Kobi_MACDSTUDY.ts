#Kobi MACD
#Created by Ian Kobi

declare lower;


input averageType = AverageType.EXPONENTIAL;



def MF = reference MoneyFlow();

input fastLength = 8;
input slowLength = 17;
input MACDLength = 9;
input showBreakoutSignals = no;

def Value = MovingAverage(averageType, MF, fastLength) - MovingAverage(averageType, MF, slowLength);
def Avg = MovingAverage(averageType, Value, MACDLength);

plot Diff = Value-Avg;


Diff.SetDefaultColor(GetColor(5));
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetLineWeight(3);
Diff.DefineColor("Positive and Up", Color.GREEN);
Diff.DefineColor("Positive and Down", Color.DARK_GREEN);
Diff.DefineColor("Negative and Down", Color.RED);
Diff.DefineColor("Negative and Up", Color.DARK_RED);
Diff.AssignValueColor(if Diff >= 0 then if Diff > Diff[1] then Diff.color("Positive and Up") else Diff.color("Positive and Down") else if Diff < Diff[1] then Diff.color("Negative and Down") else Diff.color("Negative and Up"));
