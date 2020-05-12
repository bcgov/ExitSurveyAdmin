using System.Runtime.CompilerServices;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public static class TrimAllStringsExtension
{

    public static T TrimAllStrings<T>(this T input)
    {
        var stringProperties = input
            .GetType()
            .GetProperties()
            .Where(p => p.PropertyType == typeof(string) && p.CanWrite);

        foreach (var stringProp in stringProperties)
        {
            string currentValue = (string)stringProp.GetValue(input, null);
            if (currentValue != null)
            {
                stringProp.SetValue(input, currentValue.Trim(), null);
            }
        }

        return input;
    }
}