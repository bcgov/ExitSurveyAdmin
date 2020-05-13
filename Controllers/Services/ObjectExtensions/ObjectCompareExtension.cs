using System.Collections.Generic;
using System.Linq;
using System.Reflection;


// Compare basic types. Code from https://stackoverflow.com/a/44760420.
public class PropertyVariance
{
    public PropertyInfo PropertyInfo { get; set; }
    public object ValueA { get; set; }
    public object ValueB { get; set; }
}
public static class ObjectCompareExtension
{

    public static List<PropertyVariance> DetailedCompare<T>(this T val1, T val2)
    {
        var propertyInfo = val1.GetType().GetProperties().Where(p => p.CanWrite);
        return propertyInfo
        .Select(f => new PropertyVariance
        {
            PropertyInfo = f,
            ValueA = f.GetValue(val1),
            ValueB = f.GetValue(val2)
        })
        .Where(v =>
        {
            if (v.ValueA != null)
            {
                // If ValueA is not null, compare its value to ValueB. If they
                // are NOT equal, include them.
                return !v.ValueA.Equals(v.ValueB);
            }
            else
            {
                // ValueA is null. ValueB might not be. If it isn't, include it.
                return v.ValueB != null;
            }

        })
        .ToList();
    }
}